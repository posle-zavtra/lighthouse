# The Last Light

A four-room lighthouse adventure on the Hong Kong coast, built with Next.js, React and TypeScript. Arrow keys and direction buttons move between rooms.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The existing prototype's CSS, imagery and copy are preserved in `app/` and `public/assets/`.

## Checks and Cloudflare preview

```sh
npm run lint
npm run build:worker
npm run typecheck
npx opennextjs-cloudflare preview
```

`build:worker` runs the Next.js production build and creates the OpenNext Cloudflare bundle in `.open-next/`. Preview runs that bundle locally in the Workers runtime.

## Deployment

The GitHub Actions workflow deploys pushes to `main` using `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. `scripts/set-cloudflare-secrets.sh` can set these interactively without writing credentials to files.

The existing Worker name remains `lighthouse`, including its self-reference binding. The production address remains https://lighthouse.tgush8.workers.dev. No custom domain, account or Git repository migration is required.

The game uses local client state and static images; no database, R2 cache or image transformation service is required.
