# Deployment

Two branches, two environments:

| Branch       | Target            | How                                                        |
| ------------ | ----------------- | ---------------------------------------------------------- |
| `acceptance` | Vercel (staging)  | Vercel Git integration (no workflow in this repo)          |
| `main`       | VPS (production)  | GitHub Actions — [`deploy.yml`](.github/workflows/deploy.yml) |

---

# Acceptance (Vercel)

Handled by **Vercel's native Git integration** — no GitHub Actions workflow.
The Vercel project is configured with Branch Tracking on `acceptance`, so every
push to `acceptance` creates a Production Deployment (currently
<https://nelissen-website.vercel.app>).

Setup lives in the Vercel dashboard, not this repo:

1. Project → Settings → Git → **Production Branch = `acceptance`**.
2. Project → Settings → **Environment Variables** — set the runtime config
   (these are *not* in this repo): `NEXT_PUBLIC_SITE_URL` (the acceptance URL),
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`,
   `CONTACT_TO`, `CONTACT_FROM`.

> Do **not** add a Vercel deploy workflow on top of this — it would double-deploy.
> `output: "standalone"` in `next.config.ts` is compatible with Vercel; Vercel
> uses its own build adapter and ignores it.

---

# Production (VPS via GitHub Actions)

The VPS runs **everything in Docker** — no Node, no PM2 and no app systemd units
on the host. One nginx container (`proxy`) terminates TLS for every domain and
forwards to app containers by container name over the shared `web` network.

So the pipeline in [`deploy.yml`](.github/workflows/deploy.yml) is:

> build image → push to Docker Hub → ssh to the VPS → `docker compose pull && up -d`

The server holds no source code: only `/opt/apps/nelissen-website/docker-compose.yml`
and an `.env`, both written by the workflow on every deploy.

| Piece | File |
| ----- | ---- |
| Image definition | [`Dockerfile`](Dockerfile) (multi-stage, standalone output, alpine) |
| Runtime service | [`docker-compose.prod.yml`](docker-compose.prod.yml) |
| Pipeline | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |

## 1. GitHub repository secrets / variables

Settings → Secrets and variables → Actions.

**Secrets**

| Name                   | Value                                                  |
| ---------------------- | ------------------------------------------------------ |
| `DOCKERHUB_USERNAME`   | `milovdpas8`                                           |
| `DOCKERHUB_TOKEN`      | Docker Hub access token                                |
| `VPS_HOST`             | `159.195.28.227`                                       |
| `VPS_USER`             | `deploy`                                               |
| `VPS_SSH_PRIVATE_KEY`  | CI deploy private key                                  |
| `VPS_KNOWN_HOSTS`      | `ssh-keyscan -t ed25519 <VPS_HOST>` output (host-key pin) |
| `SMTP_HOST`            | mail host for the contact form                         |
| `SMTP_PORT`            | `465`                                                  |
| `SMTP_SECURE`          | `true`                                                 |
| `SMTP_USER`            | `website@tegelhandelnelissen.nl`                       |
| `SMTP_PASS`            | mailbox password — a literal `$` must be written `$$`  |
| `CONTACT_TO`           | `info@tegelhandelnelissen.nl`                          |
| `CONTACT_FROM`         | `website@tegelhandelnelissen.nl`                       |

**Variables** (optional)

| Name                   | Default                               | Notes                          |
| ---------------------- | ------------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `https://www.tegelhandelnelissen.nl`  | Inlined at build.              |
| `NEXT_PUBLIC_GA_ID`    | unset (analytics disabled)            | Inlined at build.              |

⚠️ **`NEXT_PUBLIC_*` are compile-time constants.** They are baked into the image
as build args — canonical URLs, `sitemap.xml`, `robots.txt`, OG tags and JSON-LD
are prerendered. Changing one means a rebuild, not an `.env` edit. `SMTP_*` and
`CONTACT_*` are the opposite: read at runtime from the `.env` on the server, so
changing them is a redeploy (or `docker compose up -d`) with no rebuild.

`SMTP_PASS` needs the `$$` escape because Compose reads the same `.env` for
`${DOCKERHUB_USERNAME}` substitution in `docker-compose.yml`.

## 2. One-time VPS setup

Nothing to install — the box already runs Docker, the `web` network and the
proxy. Only the reverse proxy needs a per-domain config, done by hand once:

1. DNS: `A tegelhandelnelissen.nl` and `A www.tegelhandelnelissen.nl` → `159.195.28.227`.
2. `/opt/apps/proxy/conf.d/nelissen-website.conf` — canonical is **www**, the
   apex 301s to it (the reverse of the other apps on this server, which redirect
   www → apex, because `NEXT_PUBLIC_SITE_URL` is the www form here).
3. Certificate covering both names, www first (it names the `live/` directory):

```bash
cd /opt/apps/proxy
docker compose run --rm --entrypoint certbot certbot certonly --webroot -w /var/www/certbot \
  -d www.tegelhandelnelissen.nl -d tegelhandelnelissen.nl \
  --email vanderpasmilo@gmail.com --agree-tos --no-eff-email
docker exec proxy nginx -t && docker exec proxy nginx -s reload
```

nginx refuses to start while a conf references a certificate that doesn't exist
yet, so keep the file named `.conf.disabled` until the cert is issued.

Full detail lives in the VPS docs repo (`02-reverse-proxy-and-tls.md`).

4. Pin the host key so the deploy can't be redirected to another machine. From a
   machine you trust, take the output of

   ```bash
   ssh-keyscan -t ed25519 159.195.28.227
   ```

   and store it as the `VPS_KNOWN_HOSTS` secret. Until that secret exists the
   workflow still deploys, but it falls back to trust-on-first-use and logs a
   warning.

## Container privileges

The image runs as an unprivileged user (`nextjs`, uid 1001), not root, and
`docker-compose.prod.yml` drops every Linux capability plus `no-new-privileges`.

It still listens on **:80**, so the reverse-proxy conf needs no change. That
works because the compose file sets the namespaced sysctl
`net.ipv4.ip_unprivileged_port_start=0`, which only affects this container's
network namespace. If you ever move the app to a port above 1024, drop that
sysctl and update `proxy_pass` in `/opt/apps/proxy/conf.d/nelissen-website.conf`
in the same window, or the site 502s.

## 3. Deploy

Push to `main`, or *Actions → Deploy to VPS → Run workflow*. Verify on the VPS:

```bash
docker ps | grep nelissen-website          # Up (healthy)
curl -I https://www.tegelhandelnelissen.nl # 200
curl -I https://tegelhandelnelissen.nl     # 301 → www
```

Then submit the contact form once. Outbound SMTP is the one thing a host move
can break silently — nothing else exercises it.

## Notes that cost time to rediscover

- The container's healthcheck probes **`http://127.0.0.1/health`**, not
  `localhost`: Node binds IPv4-only and BusyBox `wget` tries `::1` first, so a
  healthy container reports `unhealthy` with the usual template.
- Both Docker stages are **alpine**. `sharp` is traced into the standalone
  output together with its platform binary, so build and runtime libc must match
  (musl) or image optimization breaks at runtime.
- `package-lock.json` must be regenerated **on Linux**, not Windows. The
  optional `wasm32` packages (`@tailwindcss/oxide-wasm32-wasi`,
  `@img/sharp-wasm32`) carry floating `^` ranges on `@emnapi/*`, and a
  Windows-generated lock can fail `npm ci` inside the image build:
  `docker run --rm -v "$PWD":/app -w /app node:22-alpine npm install --package-lock-only`
  Regenerate it **last**: a later `npm install` on Windows rewrites the lock and
  drops the `@emnapi/*` entries again, so `npm ci` fails inside the image with
  `Missing: @emnapi/runtime from lock file`. Local `node_modules` stays usable
  without re-running install.
