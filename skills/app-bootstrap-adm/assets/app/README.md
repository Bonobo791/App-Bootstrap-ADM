# SvelteKit app

Use Node 24.19.0 and npm 11.9.0. From the app directory:

```sh
cp .env.example .env
npm ci --ignore-scripts
npm run check
npm run dev
```

Edit `src/routes/+page.svelte` and add routes under `src/routes`. Keep private services in `src/lib/server`. Run `npm run build` and `npm start` to serve the production app at `http://localhost:3000`.

The start command reads `.env`. Set `ORIGIN` to the public HTTPS origin in production. Set runtime `HOST=0.0.0.0` and `PORT=3000` in Coolify; the local example binds to loopback. `SOURCE_COMMIT` is a public build input: a full GitHub commit SHA, or `local` for development. The base needs no database or credentials.

```sh
docker build -t my-app .
docker run --rm -p 127.0.0.1:3000:3000 -e ORIGIN=http://localhost:3000 my-app
```

In Coolify, use the Dockerfile build pack, root build context, `/Dockerfile`, port `3000` and runtime `ORIGIN=https://your-domain`. Make the source commit available at build time. Coolify handles the public proxy and HTTPS.

Check the home page, client assets, a missing route returning 404, `/healthz` returning `ok`, and `/build.json` matching the deployed revision. The starter blocks indexing with page metadata and `static/robots.txt`; update both when its public pages are ready.
