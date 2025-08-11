# GPT-OSS-120B Template One

GPT-OSS-120B AI SaaS Startups in hours.

![preview](preview.png)

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/gpt-oss-120b/gpt-oss-120b-template-one.git
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm dev
```

## Customize

- Set your environment variables

```bash
cp .env.example .env.local
```

- Set your theme in `app/theme.css`

[shadcn-ui-theme-generator](https://zippystarter.com/tools/shadcn-ui-theme-generator)

- Set your landing page content in `i18n/pages/landing`

- Set your i18n messages in `i18n/messages`

## Deploy

- Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgpt-oss-120b%2Fgpt-oss-120b-template-one&project-name=my-gpt-oss-120b-project&repository-name=my-gpt-oss-120b-project&redirect-url=https%3A%2F%2Fgpt-oss-120b.ai&demo-title=GPT-OSS-120B&demo-description=GPT-OSS-120B%20AI%20Startup%20in%20hours%2C%20not%20days&demo-url=https%3A%2F%2Fgpt-oss-120b.ai&demo-image=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FGgGSW3La8AAGJgU%3Fformat%3Djpg%26name%3Dlarge)

- Deploy to Cloudflare

1. Customize your environment variables

```bash
cp .env.example .env.production
cp wrangler.toml.example wrangler.toml
```

edit your environment variables in `.env.production`

and put all the environment variables under `[vars]` in `wrangler.toml`

2. Deploy

```bash
npm run cf:deploy
```

## Community

- [GPT-OSS-120B](https://gpt-oss-120b.ai)
- [Documentation](https://docs.gpt-oss-120b.ai)
- [Discord](https://discord.gg/HQNnrzjZQS)

## License

- [GPT-OSS-120B AI SaaS Boilerplate License Agreement](LICENSE)
