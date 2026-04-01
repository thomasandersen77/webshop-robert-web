Ja. Her er en **Cursor v4** som er mye skarpere: den går ned på **eksakt filstruktur**, **førsteutkast til innhold i sentrale filer**, og er skrevet så Cursor kan bruke den som build-spec uten å gjette.

Kopier dette som en egen `.md` i Cursor:

````md id="69170"
# Robert Webshop PoC – Cursor Build Spec v4

Dette dokumentet er en **konkret, file-by-file spesifikasjon** for å generere en kjørbar PoC med:

- React
- Vite
- TypeScript
- Material UI (MUI)
- React Router

Målet er å lage **tre forskjellige, moderne, lyse og mobile-first nettbutikkdesign**:

- `/design-a`
- `/design-b`
- `/design-c`

Designet skal **ikke ligne Norges Gass visuelt**, men skal ta med de beste prinsippene derfra:

- tydelig navigasjon
- mobilvennlig oppsett
- store klikkflater
- ryddig struktur
- enkel orientering

---

# 1. Kommandoer

Opprett prosjekt:

```bash id="zc0ui"
npm create vite@latest robert-webshop-poc -- --template react-ts
cd robert-webshop-poc
npm install
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
````

Valgfritt:

```bash id="0u3yb"
npm install @fontsource/inter
```

---

# 2. Filstruktur

Generer denne strukturen:

```txt id="xjx9h"
src/
  main.tsx
  App.tsx

  theme/
    theme.ts

  routes/
    AppRoutes.tsx

  data/
    categories.ts
    products.ts

  types/
    shop.ts

  components/
    layout/
      AppShell.tsx
      DesktopTopbar.tsx
      MobileTopbar.tsx
      Footer.tsx

    navigation/
      MobileMenuDrawer.tsx
      DesignSwitcher.tsx

    search/
      SearchBar.tsx

    cart/
      CartDrawer.tsx
      CartSummary.tsx

    cards/
      CategoryCard.tsx
      ProductCard.tsx

    sections/
      HeroSection.tsx
      CategoryGridSection.tsx
      ProductGridSection.tsx
      EditorialShowcaseSection.tsx
      PromoBanner.tsx

  pages/
    DesignA.tsx
    DesignB.tsx
    DesignC.tsx
```

---

# 3. Funksjonelle krav

Alle tre design skal ha:

* moderne, lyst uttrykk
* mobil-first layout
* hamburgermeny på mobil
* søkefelt
* shopping cart-ikon med badge
* cart drawer
* klikkbare kategorikort
* klikkbare produktkort
* fire faste produktkategorier
* mockdata
* norsk UI-tekst
* god spacing
* ingen horisontal scroll

---

# 4. Produktkategorier

Bruk alltid disse fire kategoriene:

1. Elektronikk
2. Hjem & Interiør
3. Sport & Fritid
4. Skjønnhet & Velvære

---

# 5. Designretninger

## Design A

* hero øverst
* enkel premium butikk
* 4 kategorikort
* produktgrid
* promo-banner

## Design B

* editorial / lifestyle
* større visuelle flater
* asymmetrisk følelse
* magasinaktig uttrykk

## Design C

* app-lignende og veldig mobilvennlig
* søk tidlig
* enkel og rask browsing
* høy klikkbarhet

---

# 6. Viktige UI-regler

* topbar skal være sticky
* mobiltopbar har hamburger venstre, logo midt, cart/søk høyre
* handlekurv åpner drawer fra høyre
* mobilmeny åpner drawer fra venstre
* kategorikort skal ha bilde + navn + kort tekst
* produktkort skal ha bilde + navn + pris + badge + CTA
* alle relevante flater skal være klikkbare
* bruk `sx` og tema, ikke mye tilfeldig CSS
* bruk MUI breakpoints, ikke hardkodet desktop-first CSS

---

# 7. Bilder

Bruk disse URL-ene direkte i mockdata:

## Elektronikk

```txt id="91xdc"
https://images.unsplash.com/photo-1749934511277-e90042265d35?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

## Hjem & Interiør

```txt id="n6a3k"
https://images.unsplash.com/photo-1737647862097-80f014f84140?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

## Sport & Fritid

```txt id="o09ng"
https://images.unsplash.com/photo-1705585851308-1b1080ba0144?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

Alternativ:

```txt id="846c7"
https://images.unsplash.com/photo-1676312830459-f6f13dfdd899?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

## Skjønnhet & Velvære

```txt id="05q1k"
https://images.unsplash.com/photo-1741896135705-9dfb73461085?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

Alternativ:

```txt id="7sr3m"
https://images.unsplash.com/photo-1768881187102-ca0131989c8a?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

---

# 8. Eksakt filinnhold

## `src/types/shop.ts`

```ts id="mzgti"
export type CategoryKey =
  | "electronics"
  | "home"
  | "sport"
  | "beauty";

export interface CategoryItem {
  id: CategoryKey;
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: CategoryKey;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "Ny" | "Populær" | "Bestselger";
  shortDescription: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
```

---

## `src/data/categories.ts`

```ts id="jlwmg"
import type { CategoryItem } from "../types/shop";

export const categories: CategoryItem[] = [
  {
    id: "electronics",
    title: "Elektronikk",
    description: "Smartere produkter for hjem, lyd og hverdag",
    image:
      "https://images.unsplash.com/photo-1749934511277-e90042265d35?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    href: "/design-a#electronics",
    badge: "Populær",
  },
  {
    id: "home",
    title: "Hjem & Interiør",
    description: "Lys, tekstiler og detaljer for et roligere hjem",
    image:
      "https://images.unsplash.com/photo-1737647862097-80f014f84140?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    href: "/design-a#home",
  },
  {
    id: "sport",
    title: "Sport & Fritid",
    description: "Produkter for aktivitet, tur og trening",
    image:
      "https://images.unsplash.com/photo-1705585851308-1b1080ba0144?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    href: "/design-a#sport",
    badge: "Ny",
  },
  {
    id: "beauty",
    title: "Skjønnhet & Velvære",
    description: "Hudpleie og velværeprodukter i moderne uttrykk",
    image:
      "https://images.unsplash.com/photo-1741896135705-9dfb73461085?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    href: "/design-a#beauty",
  },
];
```

---

## `src/data/products.ts`

```ts id="5gy9p"
import type { ProductItem } from "../types/shop";

export const products: ProductItem[] = [
  {
    id: "p-1",
    title: "Trådløse hodetelefoner",
    category: "electronics",
    price: 1499,
    oldPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1749934511277-e90042265d35?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    badge: "Bestselger",
    shortDescription: "Rent uttrykk, sterk lyd og komfort for hverdagsbruk.",
  },
  {
    id: "p-2",
    title: "Smartklokke",
    category: "electronics",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    badge: "Ny",
    shortDescription: "Elegant smartklokke med fokus på aktivitet og helse.",
  },
  {
    id: "p-3",
    title: "Bluetooth-høyttaler",
    category: "electronics",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    shortDescription: "Kompakt høyttaler med tydelig lyd og moderne form.",
  },
  {
    id: "p-4",
    title: "Bordlampe",
    category: "home",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1737647862097-80f014f84140?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    badge: "Populær",
    shortDescription: "Myke linjer og varm belysning for et rolig interiør.",
  },
  {
    id: "p-5",
    title: "Lounge-stol",
    category: "home",
    price: 3499,
    oldPrice: 3999,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    shortDescription: "Komfort og minimalisme i et lett, moderne uttrykk.",
  },
  {
    id: "p-6",
    title: "Sengetøy",
    category: "home",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    shortDescription: "Lyst og dempet sett med fokus på komfort og tekstur.",
  },
  {
    id: "p-7",
    title: "Løpesko",
    category: "sport",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1705585851308-1b1080ba0144?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    badge: "Bestselger",
    shortDescription: "Lette sko for aktivitet, tur og hverdagsbruk.",
  },
  {
    id: "p-8",
    title: "Yogamatte",
    category: "sport",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    shortDescription: "Rolig og funksjonell matte med godt grep.",
  },
  {
    id: "p-9",
    title: "Treningsflaske",
    category: "sport",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1676312830459-f6f13dfdd899?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    badge: "Ny",
    shortDescription: "Enkel, robust og lett å ta med i bevegelse.",
  },
  {
    id: "p-10",
    title: "Serum",
    category: "beauty",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1741896135705-9dfb73461085?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    badge: "Populær",
    shortDescription: "Lett serum med rent uttrykk og premium følelse.",
  },
  {
    id: "p-11",
    title: "Ansiktskrem",
    category: "beauty",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1768881187102-ca0131989c8a?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    shortDescription: "Fuktighetskrem i lyst og moderne produktunivers.",
  },
  {
    id: "p-12",
    title: "Rensegel",
    category: "beauty",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1741896135705-9dfb73461085?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    shortDescription: "Ren og enkel hudpleie for daglig bruk.",
  },
];
```

---

## `src/theme/theme.ts`

```ts id="10s1e"
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#234a67",
    },
    secondary: {
      main: "#c9b8a6",
    },
    background: {
      default: "#f7f5f2",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c2430",
      secondary: "#5f6b76",
    },
    divider: "rgba(28, 36, 48, 0.08)",
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: "#f7f5f2",
        },
        "*": {
          boxSizing: "border-box",
        },
        "img": {
          display: "block",
          maxWidth: "100%",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(28, 36, 48, 0.08)",
          color: "#1c2430",
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(18, 28, 45, 0.06)",
          border: "1px solid rgba(28, 36, 48, 0.06)",
          overflow: "hidden",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 999,
          paddingLeft: 18,
          paddingRight: 18,
        },
        containedPrimary: {
          boxShadow: "0 10px 24px rgba(35, 74, 103, 0.18)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});
```

---

## `src/routes/AppRoutes.tsx`

```tsx id="wk79y"
import { Navigate, Route, Routes } from "react-router-dom";
import DesignA from "../pages/DesignA";
import DesignB from "../pages/DesignB";
import DesignC from "../pages/DesignC";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/design-a" replace />} />
      <Route path="/design-a" element={<DesignA />} />
      <Route path="/design-b" element={<DesignB />} />
      <Route path="/design-c" element={<DesignC />} />
    </Routes>
  );
}
```

---

## `src/main.tsx`

```tsx id="sqwg4"
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App";
import { theme } from "./theme/theme";
import "@fontsource/inter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

---

## `src/App.tsx`

```tsx id="zf349"
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return <AppRoutes />;
}
```

---

## `src/components/navigation/DesignSwitcher.tsx`

```tsx id="p91oa"
import { Stack, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Design A", to: "/design-a" },
  { label: "Design B", to: "/design-b" },
  { label: "Design C", to: "/design-c" },
];

export default function DesignSwitcher() {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      {links.map((link) => (
        <Button
          key={link.to}
          component={NavLink}
          to={link.to}
          variant="text"
          sx={{
            borderRadius: 999,
            color: "text.primary",
            "&.active": {
              bgcolor: "rgba(35, 74, 103, 0.08)",
            },
          }}
        >
          {link.label}
        </Button>
      ))}
    </Stack>
  );
}
```

---

## `src/components/search/SearchBar.tsx`

```tsx id="ch8uq"
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

type Props = TextFieldProps;

export default function SearchBar(props: Props) {
  return (
    <TextField
      fullWidth
      placeholder="Søk etter produkter"
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 999,
          backgroundColor: "background.paper",
        },
        ...props.sx,
      }}
    />
  );
}
```

---

## `src/components/layout/DesktopTopbar.tsx`

```tsx id="u0s4d"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DesignSwitcher from "../navigation/DesignSwitcher";
import SearchBar from "../search/SearchBar";

interface Props {
  cartCount: number;
  onOpenCart: () => void;
}

export default function DesktopTopbar({ cartCount, onOpenCart }: Props) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 80 }}>
          <Typography
            component={Link}
            to="/design-a"
            variant="h6"
            sx={{ fontWeight: 800, minWidth: 140 }}
          >
            NordKjøp
          </Typography>

          <Box sx={{ flex: 1, maxWidth: 520 }}>
            <SearchBar />
          </Box>

          <DesignSwitcher />

          <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
            <IconButton>
              <PersonOutlineIcon />
            </IconButton>
            <IconButton onClick={onOpenCart}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
```

---

## `src/components/layout/MobileTopbar.tsx`

```tsx id="lqkqg"
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
}

export default function MobileTopbar({
  cartCount,
  onOpenCart,
  onOpenMenu,
}: Props) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            justifyContent: "space-between",
            px: "2px",
          }}
        >
          <IconButton onClick={onOpenMenu} aria-label="Åpne meny">
            <MenuIcon />
          </IconButton>

          <Typography
            component={Link}
            to="/design-a"
            variant="h6"
            sx={{ fontWeight: 800 }}
          >
            NordKjøp
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton aria-label="Søk">
              <SearchIcon />
            </IconButton>
            <IconButton onClick={onOpenCart} aria-label="Handlekurv">
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
```

---

## `src/components/navigation/MobileMenuDrawer.tsx`

```tsx id="gkze0"
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DesignSwitcher from "./DesignSwitcher";

interface Props {
  open: boolean;
  onClose: () => void;
}

const items = ["Hjem", "Kategorier", "Tilbud", "Nyheter", "Min konto", "Handlekurv"];

export default function MobileMenuDrawer({ open, onClose }: Props) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Meny
          </Typography>

          <DesignSwitcher />

          <Divider />

          <List disablePadding>
            {items.map((item) => (
              <ListItemButton
                key={item}
                component={Link}
                to="/design-a"
                onClick={onClose}
                sx={{ borderRadius: 3 }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Box>
    </Drawer>
  );
}
```

---

## `src/components/cart/CartSummary.tsx`

```tsx id="eaa78"
import { Stack, Typography } from "@mui/material";

interface Props {
  total: number;
}

export default function CartSummary({ total }: Props) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Delsum
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
        NOK {total}
      </Typography>
    </Stack>
  );
}
```

---

## `src/components/cart/CartDrawer.tsx`

```tsx id="j12ry"
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { CartItem } from "../../types/shop";
import CartSummary from "./CartSummary";

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function CartDrawer({ open, onClose, items }: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 340, sm: 420 }, p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Handlekurv
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            {items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={1.5}
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "background.default",
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 3,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Antall: {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    NOK {item.price}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>

          <Divider />

          <CartSummary total={total} />

          <Stack spacing={1.5} sx={{ pt: 1 }}>
            <Button variant="contained" size="large">
              Gå til betaling
            </Button>
            <Button variant="outlined" size="large" onClick={onClose}>
              Fortsett å handle
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}
```

---

## `src/components/cards/CategoryCard.tsx`

```tsx id="jlwmj"
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { CategoryItem } from "../../types/shop";

interface Props {
  item: CategoryItem;
  tall?: boolean;
}

export default function CategoryCard({ item, tall = false }: Props) {
  return (
    <Card
      component={Link}
      to={item.href}
      sx={{
        display: "block",
        height: "100%",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 32px rgba(18, 28, 45, 0.10)",
        },
      }}
    >
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: "100%",
          height: tall ? 320 : 240,
          objectFit: "cover",
        }}
      />

      <Stack spacing={1.2} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{item.title}</Typography>
          <ChevronRightIcon />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>

        {item.badge ? <Chip label={item.badge} size="small" sx={{ width: "fit-content" }} /> : null}
      </Stack>
    </Card>
  );
}
```

---

## `src/components/cards/ProductCard.tsx`

```tsx id="82f92"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { ProductItem } from "../../types/shop";

interface Props {
  item: ProductItem;
  onAddToCart?: (item: ProductItem) => void;
}

export default function ProductCard({ item, onAddToCart }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 32px rgba(18, 28, 45, 0.10)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          sx={{
            width: "100%",
            height: 240,
            objectFit: "cover",
          }}
        />

        <IconButton
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(255,255,255,0.9)",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>

        {item.badge ? (
          <Chip
            label={item.badge}
            size="small"
            color="primary"
            sx={{
              position: "absolute",
              left: 12,
              bottom: 12,
              bgcolor: "rgba(35, 74, 103, 0.92)",
              color: "white",
            }}
          />
        ) : null}
      </Box>

      <Stack spacing={1.2} sx={{ p: 2 }}>
        <Typography variant="h6">{item.title}</Typography>

        <Typography variant="body2" color="text.secondary">
          {item.shortDescription}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            NOK {item.price}
          </Typography>
          {item.oldPrice ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              NOK {item.oldPrice}
            </Typography>
          ) : null}
        </Stack>

        <Button
          variant="contained"
          onClick={() => onAddToCart?.(item)}
          sx={{ alignSelf: "flex-start" }}
        >
          Legg i handlekurv
        </Button>
      </Stack>
    </Card>
  );
}
```

---

## `src/components/sections/HeroSection.tsx`

```tsx id="zc0dy"
import { Box, Button, Container, Stack, Typography } from "@mui/material";

interface Props {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  image?: string;
}

export default function HeroSection({
  eyebrow,
  title,
  description,
  ctaLabel = "Utforsk kategorier",
  image,
}: Props) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Box
        sx={{
          borderRadius: 6,
          overflow: "hidden",
          bgcolor: "background.paper",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          minHeight: { xs: "auto", md: 440 },
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            p: { xs: 3, md: 5 },
            justifyContent: "center",
          }}
        >
          {eyebrow ? (
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.12em", color: "primary.main", fontWeight: 700 }}
            >
              {eyebrow}
            </Typography>
          ) : null}

          <Typography variant="h3" sx={{ fontSize: { xs: 34, md: 52 }, lineHeight: 1.02 }}>
            {title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560 }}>
            {description}
          </Typography>

          <Box>
            <Button variant="contained" size="large">
              {ctaLabel}
            </Button>
          </Box>
        </Stack>

        {image ? (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              minHeight: { xs: 280, md: "100%" },
              objectFit: "cover",
            }}
          />
        ) : null}
      </Box>
    </Container>
  );
}
```

---

## `src/components/sections/CategoryGridSection.tsx`

```tsx id="sx0bw"
import { Container, Stack, Typography, Box } from "@mui/material";
import type { CategoryItem } from "../../types/shop";
import CategoryCard from "../cards/CategoryCard";

interface Props {
  title: string;
  items: CategoryItem[];
  tall?: boolean;
}

export default function CategoryGridSection({ title, items, tall = false }: Props) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack spacing={2.5}>
        <Typography variant="h4">{title}</Typography>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          {items.map((item) => (
            <CategoryCard key={item.id} item={item} tall={tall} />
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
```

---

## `src/components/sections/ProductGridSection.tsx`

```tsx id="kefby"
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { ProductItem } from "../../types/shop";
import ProductCard from "../cards/ProductCard";

interface Props {
  title: string;
  items: ProductItem[];
  onAddToCart?: (item: ProductItem) => void;
}

export default function ProductGridSection({ title, items, onAddToCart }: Props) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{title}</Typography>
          <Button variant="text">Se alle</Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {items.map((item) => (
            <ProductCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
```

---

## `src/components/sections/EditorialShowcaseSection.tsx`

```tsx id="6t5p0"
import { Box, Button, Container, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export default function EditorialShowcaseSection({
  title,
  description,
  image,
  reverse = false,
}: Props) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            order: reverse ? { xs: 1, md: 2 } : 1,
            borderRadius: 6,
            overflow: "hidden",
            minHeight: 360,
          }}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Stack
          spacing={2}
          sx={{
            order: reverse ? { xs: 2, md: 1 } : 2,
            bgcolor: "background.paper",
            borderRadius: 6,
            p: { xs: 3, md: 5 },
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          <Box>
            <Button variant="contained">Se utvalget</Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
```

---

## `src/components/sections/PromoBanner.tsx`

```tsx id="jm25z"
import { Box, Button, Container, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  description: string;
}

export default function PromoBanner({ title, description }: Props) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        sx={{
          borderRadius: 6,
          p: { xs: 3, md: 4 },
          bgcolor: "rgba(35, 74, 103, 0.08)",
          border: "1px solid rgba(35, 74, 103, 0.08)",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography color="text.secondary">{description}</Typography>
        </Box>

        <Button variant="contained">Utforsk nå</Button>
      </Stack>
    </Container>
  );
}
```

---

## `src/components/layout/Footer.tsx`

```tsx id="w8jx6"
import { Box, Container, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="xl">
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            NordKjøp
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Moderne nettbutikk-PoC med fokus på lys, ryddig og mobilvennlig handel.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
```

---

## `src/components/layout/AppShell.tsx`

```tsx id="fk120"
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useMemo, useState, type PropsWithChildren } from "react";
import { products } from "../../data/products";
import type { CartItem, ProductItem } from "../../types/shop";
import CartDrawer from "../cart/CartDrawer";
import MobileMenuDrawer from "../navigation/MobileMenuDrawer";
import DesktopTopbar from "./DesktopTopbar";
import Footer from "./Footer";
import MobileTopbar from "./MobileTopbar";

export default function AppShell({ children }: PropsWithChildren) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems = useMemo<CartItem[]>(
    () => [
      {
        id: products[0].id,
        title: products[0].title,
        price: products[0].price,
        image: products[0].image,
        quantity: 1,
      },
      {
        id: products[3].id,
        title: products[3].title,
        price: products[3].price,
        image: products[3].image,
        quantity: 1,
      },
    ],
    []
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (_item: ProductItem) => {
    setIsCartOpen(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {isDesktop ? (
        <DesktopTopbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      ) : (
        <MobileTopbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      )}

      <Box>{typeof children === "function" ? (children as never) : children}</Box>

      <Footer />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />

      <MobileMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Box>
  );
}

export { AppShell };
```

---

## `src/pages/DesignA.tsx`

```tsx id="lfkb5"
import AppShell from "../components/layout/AppShell";
import CategoryGridSection from "../components/sections/CategoryGridSection";
import HeroSection from "../components/sections/HeroSection";
import ProductGridSection from "../components/sections/ProductGridSection";
import PromoBanner from "../components/sections/PromoBanner";
import { categories } from "../data/categories";
import { products } from "../data/products";

export default function DesignA() {
  return (
    <AppShell>
      <HeroSection
        eyebrow="Design A"
        title="Moderne produkter for hjem, hverdag og livsstil"
        description="Utforsk en lys og ryddig nettbutikk med tydelige kategorier, rene produktflater og enkel orientering for kunden."
        ctaLabel="Utforsk kategorier"
        image={categories[0].image}
      />

      <CategoryGridSection title="Utforsk kategorier" items={categories} />
      <ProductGridSection title="Utvalgte produkter" items={products.slice(0, 8)} />
      <PromoBanner
        title="Nye kolleksjoner i et lysere, roligere uttrykk"
        description="Bygget for moderne handel på mobil og desktop, med en enkel struktur som er lett å vise frem."
      />
    </AppShell>
  );
}
```

---

## `src/pages/DesignB.tsx`

```tsx id="o8nje"
import AppShell from "../components/layout/AppShell";
import CategoryGridSection from "../components/sections/CategoryGridSection";
import EditorialShowcaseSection from "../components/sections/EditorialShowcaseSection";
import ProductGridSection from "../components/sections/ProductGridSection";
import { categories } from "../data/categories";
import { products } from "../data/products";

export default function DesignB() {
  return (
    <AppShell>
      <EditorialShowcaseSection
        title="Utforsk produkter med et rolig, moderne uttrykk"
        description="Denne varianten føles mer som en editorial butikk. Store bildeflater, tydelig rytme og romslig layout gir et premium preg."
        image={categories[1].image}
      />

      <CategoryGridSection title="Kuraterte kategorier" items={categories} tall />
      
      <EditorialShowcaseSection
        title="Designet for kunder som vil finne frem raskt"
        description="Kombiner store visuelle flater med tydelige produktkort og ryddig navigasjon. Resultatet er lett å bruke og enkelt å forstå."
        image={categories[3].image}
        reverse
      />

      <ProductGridSection title="Utvalgte produkter" items={products.slice(2, 10)} />
    </AppShell>
  );
}
```

---

## `src/pages/DesignC.tsx`

```tsx id="xy0zq"
import { Box, Container, Stack, Typography } from "@mui/material";
import AppShell from "../components/layout/AppShell";
import SearchBar from "../components/search/SearchBar";
import CategoryGridSection from "../components/sections/CategoryGridSection";
import ProductGridSection from "../components/sections/ProductGridSection";
import PromoBanner from "../components/sections/PromoBanner";
import { categories } from "../data/categories";
import { products } from "../data/products";

export default function DesignC() {
  return (
    <AppShell>
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 4 } }}>
        <Stack spacing={2}>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700 }}>
            Design C
          </Typography>

          <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 44 }, lineHeight: 1.05 }}>
            Hva ser du etter i dag?
          </Typography>

          <Typography color="text.secondary" sx={{ maxWidth: 620 }}>
            En app-lignende nettbutikk med fokus på rask browsing, tydelige kategorier og enkel bruk på mobil.
          </Typography>

          <Box sx={{ maxWidth: 640 }}>
            <SearchBar />
          </Box>
        </Stack>
      </Container>

      <CategoryGridSection title="Handle raskt blant populære kategorier" items={categories} />
      <ProductGridSection title="Populære valg" items={products.slice(0, 4)} />
      <ProductGridSection title="Nye produkter" items={products.slice(4, 12)} />
      <PromoBanner
        title="Lett å bruke, lett å vise frem"
        description="Denne layouten prioriterer høy klikkbarhet, tydelig søk og rask navigasjon på mobil."
      />
    </AppShell>
  );
}
```

---

# 9. Ferdigstilling og polish

Når Cursor har generert koden:

1. verifiser at appen starter
2. juster spacing om noe føles trangt
3. sørg for at bilder cropper pent
4. sørg for at drawers fungerer på mobil
5. test alle tre rutene
6. test handlekurvknapp
7. test hamburgermeny
8. test produktkort og kategorikort

---

# 10. Viktige forbedringer Cursor gjerne kan gjøre automatisk

Hvis mulig, la Cursor også:

* legge til subtile hover-effekter
* legge til fokusstil for tastaturbruk
* gi `CardActionArea`-lignende følelse på klikkbare kort
* sikre at topbaren ikke tar for mye plass på mobil
* bruke `safe-area-inset-bottom` hvis det introduseres sticky actionbar nederst
* gjøre `DesignSwitcher` mer visuelt polert på desktop

---

# 11. Ikke gjør dette

Cursor skal ikke:

* lage mørk, tung eller corporate UI
* bruke tabellbasert butikkvisning
* lage adminpanel-følelse
* bruke mye tilfeldig custom CSS
* gjøre layouten lik Norges Gass
* lage enorme sidekomponenter med alt i én fil utover dette førsteutkastet

Når grunnversjonen fungerer, kan komponentene splittes videre ved behov.

---

# 12. Endelig instruksjon til Cursor

Bruk denne spesifikasjonen som kilde til å generere hele prosjektet.
Lag en kjørbar løsning som ser ut som en moderne nettbutikkdemo og som fungerer godt på både mobil og desktop.

Hvis det oppstår små typerelaterte problemer, prioriter:

* kompilérbar kode
* korrekt MUI-bruk
* responsivitet
* klikkbarhet
* visuelt ryddig resultat

```

Etter dette bør neste steg være en **Cursor v5** som er enda mer praktisk: en versjon der jeg skriver det som en **“do this now” prompt** til Cursor, i stedet for som spesifikasjon. Da blir det mer “bygg prosjektet” enn “tolk dette dokumentet”.
```
