# webshop-robert-web

Kundevendt nettbutikk-frontend (React, Vite, MUI). Tidligere under `frontend/` i monorepoet `webshop-robert`.

## Utvikling

```bash
npm install
npm run dev
```

## Bygg

```bash
npm run build
```

Byggoutput: `dist/` (Vite standard).

## Azure Static Web Apps

Deploy skjer via GitHub Actions (`.github/workflows/azure-static-web-apps-ambitious-hill-0358d0703.yml`) ved push og pull request mot `main`.

I GitHub-repoet må secret `AZURE_STATIC_WEB_APPS_API_TOKEN_AMBITIOUS_HILL_0358D0703` være satt (samme som i Azure-portalen / deployment token for Static Web App).

## Antakelse

- `dist/` versjoneres ikke; den genereres med `npm run build`.
