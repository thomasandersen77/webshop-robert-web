---
name: robert-shop-design-c
description: Guides storefront UI for webshop-robert-web—single home at `/`, mobile-first layout, MUI theme, and card-based sections. Use when changing the shop front, theme, or sections; the codebase has no alternate design routes or A/B switcher.
---

# Butikkforside (én layout)

**Forsiden** er `src/pages/HomePage.tsx` på rute **`/`**. Det finnes ikke design A/B eller bytter i UI — bare dette oppsettet.

---

### Prinsipp

| | |
| :--- | :--- |
| Kanon | All butikk-UI utvikles mot **`HomePage`** og delte komponenter (`CategoryCard`, `ProductGridSection`, `SearchBar`). |
| Kontrast | Mørk primary-gradient i hero; seksjoner veksler `paper` / `default`; tekst fra theme. |
| Touch | Store klikkflater; horisontal scroll for chip-rader der det trengs. |
| Tema | `src/theme/theme.ts` — én palett. |

---

### Tekniske ankre

| Hva | Hvor |
| :--- | :--- |
| Forside | `src/pages/HomePage.tsx`, rute `/` |
| Skall | `AppShell`, `DesktopTopbar`, `MobileTopbar`, `MobileMenuDrawer` — logo går til `/` |
| Søk (hero) | `SearchBar` med `surface="hero"` |
| Produktgrid | `ProductGridSection` · `ProductCard` (uten variant-prop) |

---

### Ved endringer

1. Mobil først (`xs` → `md`).
2. `Container maxWidth="lg"` for hovedinnhold.
3. Lenker «Se alle»: `fontWeight` 700, `color: primary.main`.
4. Safe area der faste barer overlapper: `env(safe-area-inset-bottom)`.

---

### Ikke

- Gjeninnfør ikke design-bytter eller ekstra forsider uten eksplisitt produktvalg.
- Unngå parallelle fargepaletter utenfor theme.

---

### Sjekk

- [x] `/` viser `HomePage`.
- [x] Logo «Robert Shop» sender til `/`.
- [x] Ingen imports etter slettede `DesignA` / `DesignB` / `DesignSwitcher`.
