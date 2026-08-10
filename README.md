# JeffKM Portfolio

Bilingual product portfolio and development journal for JeffKM (Kyungmin Lee). The site is a fully static Next.js export deployed to GitHub Pages.

## Development

```bash
nvm use
npm ci
npm run dev
```

Run the complete local verification:

```bash
npm run type-check
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

## Publishing rules

- Public content must carry equivalent Korean and English information.
- Project status and outcomes must be backed by a source or a verified user flow.
- Draft or unverified résumés are not linked publicly.
- The production build is fully static and must not depend on server actions, middleware, cookies, or runtime route handlers.

## License

Site implementation code is available under the MIT License. Written content, project descriptions, screenshots, brand elements, game assets, résumés, and other media are excluded and remain copyright © JeffKM unless separately stated. Third-party assets retain their original licenses.
