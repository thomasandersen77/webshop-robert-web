---
name: webshop-api-integration
description: Describes how webshop-robert-web integrates with the Spring API—catalog GET endpoints, JWT customer auth, basket mutations, DTO alignment, and placeholder images. Use when extending API calls, cart, auth, or when the prompt references frontend-backend integration.
---

# API-integrasjon (Robert Shop)

## Bakgrunn

- **Katalog** (`GET /api/product-categories`) er offentlig; data mappes i `CatalogProvider` / `mapCatalog.ts`.
- **Handlekurv** (`/api/cart/**`) krever innlogget **CUSTOMER** (JWT). Admin-token kan ikke bruke kurv — `RbacService.checkCustomer`.
- **Registrering kunde**: `POST /api/customers` (samme kropp som auth-register). **Innlogging**: `POST /api/auth/login`.
- **Beløp**: API bruker **minor units** (øre); visning via `formatNokFromMinor`. Total i kurv kommer fra `CartResponseDto.total`, ikke fra klientberegning.
- **Bilder**: Backend `Product` har ingen `imageUrl` — UI bruker deterministiske placeholders (`utils/placeholders.ts`). Når backend utvider felt, mappes det i API-laget.

## Lagstruktur

| Lag | Rolle |
| :--- | :--- |
| `src/api/*.ts` | HTTP-kall, `apiFetch` + typer |
| `src/types/api/dto.ts` | DTO-er som matcher Kotlin-respons |
| `CatalogContext` | Laster katalog én gang, `getProductById` for kurv-linjer |
| `CustomerAuthContext` | JWT kunde (`webshop_customer_token`) |
| `ShopUiProvider` | Kurvstatus, `ensureBasket` → add/remove, synk mot API |
| `AuthContext` | Kun **admin** (`webshop_admin_token`) — uendret |

## Nye endringer

- Ikke legg `fetch()` direkte i presentational komponenter — utvid `api/` eller kontekst.
- Etter mutasjon på kurv: bruk respons eller `getBasket` for å unngå stale state.
- CORS: utvikling via Vite `proxy` mot `localhost:8080`; produksjon sett `VITE_API_BASE_URL`.

## Sjekk

- [ ] Kurv med innlogget kunde: total = `total.amountMinor` fra API.
- [ ] Uten innlogging: «legg i handlekurv» viser behov for innlogging.
- [ ] Admin og kunde bruker ulike session-nøkler (kan være begge i samme nettleser).
