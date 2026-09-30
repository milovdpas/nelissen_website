# Deployment

Two branches, two environments:

| Branch       | Target             | How                                                                            |
| ------------ | ------------------ | ------------------------------------------------------------------------------ |
| `acceptance` | VPS (acceptance)   | GitHub Actions — [`deploy-acceptance.yml`](.github/workflows/deploy-acceptance.yml) |
| `main`       | VPS (production)   | GitHub Actions — [`deploy.yml`](.github/workflows/deploy.yml)                   |

Both environments run on the same box, behind the same proxy, from the same
`Dockerfile`. They differ only in the build args the workflow passes and the
container they deploy to — see [The acceptance environment](#the-acceptance-environment).

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
| `CONTACT_TO`           | `info@tegelhandelnelissen.nl` — production deploy only |
| `CONTACT_TO_TEST`      | inbox that acceptance mail is diverted to              |
| `CONTACT_FROM`         | `website@tegelhandelnelissen.nl`                       |

**Variables** (optional)

| Name                   | Default                               | Notes                          |
| ---------------------- | ------------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `https://www.tegelhandelnelissen.nl`  | Inlined at build.              |
| `NEXT_PUBLIC_GA_ID`    | unset (analytics disabled)            | Inlined at build. Left unset on acceptance so test traffic stays out of the live property. |
| `APP_ENV`              | unset → treated as non-production     | Set per workflow, not per repo. Build arg **and** runtime env. |

⚠️ **`NEXT_PUBLIC_*` are compile-time constants.** They are baked into the image
as build args — canonical URLs, `sitemap.xml`, `robots.txt`, OG tags and JSON-LD
are prerendered. Changing one means a rebuild, not an `.env` edit. `SMTP_*` and
`CONTACT_*` are the opposite: read at runtime from the `.env` on the server, so
changing them is a redeploy (or `docker compose up -d`) with no rebuild.

⚠️ **`APP_ENV` is the one variable that belongs in *both* columns.** `robots.txt`
and the layout's robots metadata are generated during `next build`, while the
mailer reads it per request — so it is passed as a Docker build ARG *and* written
into the runtime `.env`. The Dockerfile also carries the build value into the
runtime stage, so an `.env` that forgets it cannot silently divert production mail
to the test inbox.

Unset means **non-production** (`lib/env.ts`), deliberately: forgetting it costs a
noindexed site or a test email — visible and recoverable — rather than an indexed
acceptance environment or a customer enquiry sent to a mailbox nobody reads.

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

## The acceptance environment

`acceptance` branch → `https://acceptance.tegelhandelnelissen.nl/`, same box, same
proxy, same image recipe. Built by `.github/workflows/deploy-acceptance.yml` into
`/opt/apps/nelissen-website-acceptance`, container `nelissen-website-acceptance`,
image tag `:acceptance`.

**DNS needs nothing.** `*.tegelhandelnelissen.nl` is a wildcard A record pointing
at the VPS, so the hostname already resolves. Any future subdomain here likewise
needs only an nginx conf and a certificate.

It differs from production in exactly three places, all in the workflow:
`NEXT_PUBLIC_SITE_URL` (self-referencing canonicals), `NEXT_PUBLIC_GA_ID` (omitted,
so test clicks stay out of the live Analytics property) and `APP_ENV=acceptance`
(blocks indexing, diverts all mail to `CONTACT_TO_TEST`). `CONTACT_TO` is never
written to that machine at all.

### One-time proxy setup

Two orderings matter, and both are easy to get wrong:

- **The container must exist before the conf is enabled.** nginx resolves
  `proxy_pass` upstream names at startup and refuses to start if
  `nelissen-website-acceptance` is not running. Push `acceptance` first.
- **Per-domain confs here contain only `listen 443` blocks.** `00-http.conf`
  handles port 80 for every host — serving the ACME webroot and redirecting the
  rest to HTTPS. So the certificate can be issued before this conf exists at all,
  and the conf needs no `listen 80` block of its own. Renewals go over port 80
  too, which is why the basic auth below cannot break them.

**1. Password file** (no `htpasswd` binary needed on the host):

```bash
printf 'nelissen:%s\n' "$(openssl passwd -apr1)" \
  > /opt/apps/proxy/conf.d/.htpasswd-nelissen
```

**2. Certificate:**

```bash
cd /opt/apps/proxy
docker compose run --rm --entrypoint certbot certbot certonly --webroot -w /var/www/certbot \
  -d acceptance.tegelhandelnelissen.nl \
  --email vanderpasmilo@gmail.com --agree-tos --no-eff-email
```

**3. `/opt/apps/proxy/conf.d/nelissen-website-acceptance.conf`.** noindex asks
crawlers politely; the auth is what actually keeps people out.

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name acceptance.tegelhandelnelissen.nl;

    ssl_certificate     /etc/letsencrypt/live/acceptance.tegelhandelnelissen.nl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/acceptance.tegelhandelnelissen.nl/privkey.pem;

    auth_basic "Acceptance";
    # Beside the confs on purpose: that directory is already mounted into the
    # proxy container. A path elsewhere under /etc/nginx exists on the host but
    # not in the container, and nginx then fails to start.
    auth_basic_user_file /etc/nginx/conf.d/.htpasswd-nelissen;

    # Renewal runs over port 80 via 00-http.conf, so this is belt-and-braces —
    # it keeps renewals working if this vhost ever gains its own :80 block.
    location ^~ /.well-known/acme-challenge/ {
        auth_basic off;
        root /var/www/certbot;
    }

    # For external uptime checks. The container healthcheck probes 127.0.0.1
    # directly and never passes through nginx, so it is unaffected either way.
    location = /health {
        auth_basic off;
        proxy_pass http://nelissen-website-acceptance:80;
        proxy_set_header Host $host;
    }

    location / {
        proxy_pass http://nelissen-website-acceptance:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**4. Reload and verify:**

```bash
docker exec proxy nginx -t && docker exec proxy nginx -s reload

curl -I https://acceptance.tegelhandelnelissen.nl/                    # 401
curl -I -u nelissen:PASS https://acceptance.tegelhandelnelissen.nl/   # 200 + X-Robots-Tag
curl -u nelissen:PASS https://acceptance.tegelhandelnelissen.nl/robots.txt  # Disallow: /
curl -I https://acceptance.tegelhandelnelissen.nl/health              # 200, no auth
```

Then submit the contact form once and confirm the mail is prefixed
`[TEST — acceptance]`, carries the red banner, and arrived at `CONTACT_TO_TEST`
rather than `info@`. That is the one path a misconfiguration breaks silently.

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
