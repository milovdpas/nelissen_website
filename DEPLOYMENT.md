# Deployment

Two branches, two environments:

| Branch       | Target           | Workflow                                                                       |
| ------------ | ---------------- | ------------------------------------------------------------------------------ |
| `acceptance` | Vercel (staging) | [`deploy-acceptance.yml`](.github/workflows/deploy-acceptance.yml)             |
| `main`       | VPS (production)  | [`deploy.yml`](.github/workflows/deploy.yml)                                   |

---

# Acceptance (Vercel)

Push to `acceptance` → GitHub Actions builds with the Vercel CLI and deploys to
the Vercel project that represents the acceptance environment.

## Secrets

Settings → Secrets and variables → Actions.

| Name                | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `VERCEL_TOKEN`      | Vercel access token (Account Settings → Tokens).                         |
| `VERCEL_ORG_ID`     | From `.vercel/project.json` after `vercel link`, or the team settings.   |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` after `vercel link`.                         |

## One-time setup

1. Create a Vercel project for acceptance and run `vercel link` locally to get
   the org/project IDs (`.vercel/project.json`).
2. In the Vercel project's **Environment Variables**, set the runtime config —
   these are *not* in this repo: `NEXT_PUBLIC_SITE_URL` (the acceptance URL),
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`,
   `CONTACT_TO`, `CONTACT_FROM`.
3. Disable Vercel's own Git auto-deploy for this project (Project → Settings →
   Git) so deploys happen only through this workflow and you don't get double
   builds.

> `output: "standalone"` in `next.config.ts` is compatible with Vercel — Vercel
> uses its own build adapter and ignores it.

---

# Production (VPS via GitHub Actions)

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds the Next.js app on push to `main`, ships the **standalone** output to the
VPS over SSH/rsync, and restarts a systemd service. No build runs on the VPS.

## 1. GitHub repository secrets / variables

Settings → Secrets and variables → Actions.

**Secrets**

| Name              | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `SSH_PRIVATE_KEY` | Private key (with passphrase if any) for an account on the VPS.    |
| `VPS_HOST`        | VPS IP or hostname, e.g. `191.101.80.235`.                         |
| `VPS_USER`        | SSH user, e.g. `root` or a deploy user with sudo for systemctl.    |

**Variables** (optional)

| Name                  | Default                                | Notes                                |
| --------------------- | -------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`| `https://www.tegelhandelnelissen.nl`   | Inlined at build (canonical/OG/etc). |

The deploy path (`/var/www/nelissen-website`) and service name
(`nelissen-website.service`) are set in the workflow `env:` block — change them
there if needed.

## 2. One-time VPS setup

```bash
# Node 22 (matches CI). Example via nodesource:
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo mkdir -p /var/www/nelissen-website
sudo chown -R "$USER":"$USER" /var/www/nelissen-website
```

### Runtime environment (SMTP etc.)

`SMTP_*` and `CONTACT_*` are read **at runtime**, so they live on the server, not
in the build. Create an env file (root-only readable):

```bash
sudo tee /etc/nelissen-website.env >/dev/null <<'EOF'
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://www.tegelhandelnelissen.nl
SMTP_HOST=mail.example.nl
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=website@tegelhandelnelissen.nl
SMTP_PASS=__your_password__
CONTACT_TO=info@tegelhandelnelissen.nl
CONTACT_FROM=website@tegelhandelnelissen.nl
EOF
sudo chmod 600 /etc/nelissen-website.env
```

### systemd service

```ini
# /etc/systemd/system/nelissen-website.service
[Unit]
Description=Nelissen website (Next.js)
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/nelissen-website
EnvironmentFile=/etc/nelissen-website.env
ExecStart=/usr/bin/node server.js
Restart=on-failure
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now nelissen-website.service
```

> If `VPS_USER` is not root, give it passwordless sudo for just the restart:
> `deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart nelissen-website.service, /bin/systemctl daemon-reload`

### nginx reverse proxy + HTTPS

```nginx
server {
    server_name www.tegelhandelnelissen.nl tegelhandelnelissen.nl;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

The `X-Forwarded-For` header above is what the contact API rate limiter reads to
identify clients. Add TLS with `sudo certbot --nginx`.

## 3. Deploy

Push to `main` — the workflow builds, transfers, and restarts. First push will
populate `/var/www/nelissen-website`; subsequent pushes update it in place.
