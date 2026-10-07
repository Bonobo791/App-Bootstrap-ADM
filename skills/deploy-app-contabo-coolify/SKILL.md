---
name: deploy-app-contabo-coolify
description: Use when setting up or deploying a SvelteKit standalone Node application on a Contabo VPS with self-hosted Coolify.
---

# Host a SvelteKit app on Contabo and Coolify

Reuse the existing VPS and Coolify installation when available. The app runs in one Node container; Coolify handles the public proxy and HTTPS. Follow the user's authorization for server changes.

## Prepare the server

For a new VPS, use Ubuntu 24.04 LTS and SSH key access. Coolify needs at least 2 CPU cores, 2 GB RAM and 10 GB disk; allow additional capacity for builds and retained images.

Use the Contabo firewall to allow public TCP 80 and 443. Restrict SSH to the operators and Coolify, keeping the current session open while checking access. Restrict direct dashboard ports 8000, 6001 and 6002 to operators during setup. Docker-published ports can bypass ordinary UFW rules.

On a fresh server without Coolify, connect with root or sudo access and run:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh -o /tmp/coolify-install.sh
sudo bash /tmp/coolify-install.sh
```

Create the first administrator immediately. Configure and verify an HTTPS dashboard domain, then close public access to direct dashboard ports. Back up `/data/coolify/source/.env` privately and validate the server in Coolify.

## Deploy the app

1. Connect the copied application's repository through Coolify's GitHub integration. Select its branch, server and project environment.
2. Select the Dockerfile build pack, repository root build context, `/Dockerfile` and exposed port `3000`. Set runtime `HOST=0.0.0.0`, `PORT=3000` and `ORIGIN=https://your-domain`. `ORIGIN` is the public origin behind the proxy and has no container port suffix. The base needs no volumes or application credentials.
3. Enable source commit availability during the build in Advanced → Build so Coolify supplies `SOURCE_COMMIT` (older versions call this Include Source Commit in Build). It is a public Docker build argument. Keep application credentials in runtime variables or explicitly configured build secrets.
4. Point the domain's A record at the VPS IPv4 address. Add AAAA only when IPv6 works. Set the Coolify application domain with HTTPS and destination port, for example `https://example.com:3000`. Visitors use port 443; Coolify forwards to container port 3000 and obtains the certificate.
5. Deploy. Verify home/client assets/404, `/healthz` returning `ok`, and `/build.json` matching the deployed Git commit. Test HTTPS and the browser interaction. Enable public indexing when ready and automatic deployments when that is the project's normal workflow.

Retain the previous image and working configuration. If deployment fails, redeploy the previous commit or image and verify its marker and routes. Record server, domain, revision and checks on the project task without credentials. Keep an existing CDN when the project uses one.
