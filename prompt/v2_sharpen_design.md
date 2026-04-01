Her er en skarpere Cursor-fil, skrevet direkte i chatten som markdown og bygget videre på forrige nivå, men mer presis på **filstruktur, komponenter, oppførsel, mockdata, routing og UI-krav**.

````md
# Robert Webshop PoC – Cursor Build Spec v3

Dette dokumentet er en **presis build-spec** for Cursor.  
Målet er å generere en **lokal, kjørbar React + Vite + TypeScript + MUI-applikasjon** med **tre distinkte, moderne og lyse nettbutikkdesign**.

Denne spesifikasjonen er laget for å være konkret nok til at Cursor kan produsere kode direkte, uten å måtte gjette arkitektur, komponentinndeling eller interaksjonsmønstre.

---

# 1. Mål

Lag en **nettbutikk-PoC** for en kunde som vil selge ulike produkter.  
Dette skal være en **moderne kundevendt frontend**, ikke et adminsystem.

Appen skal:

- se moderne og lys ut
- være **mobile first**
- være enkel å vise frem til kunde
- ha tydelig navigasjon
- ha **hamburgermeny på mobil**
- ha **søkefelt**
- ha **shopping cart**
- ha **klikkbare kategorikort**
- ha **klikkbare produktkort**
- inneholde **tre ulike designretninger**
- bruke **fire faste produktkategorier**
- være enkel å utvide senere med backend, Stripe, Vipps, lager og admin

---

# 2. Teknologistack

Bruk:

- **React**
- **Vite**
- **TypeScript**
- **Material UI (MUI)**
- **React Router**
- **MUI Icons**

Ikke bruk Tailwind.  
Ikke bruk styled-components utenfor MUI sitt eget system.  
Foretrekk `sx`, tema og små gjenbrukbare komponenter.

---

# 3. Output som skal genereres

Cursor skal generere en app med disse rutene:

- `/` → redirect til `/design-a`
- `/design-a`
- `/design-b`
- `/design-c`

Hver route skal vise en **full nettbutikk-forside** med et eget designuttrykk.

---

# 4. Produktkategorier

Bruk disse fire kategoriene i alle design:

1. **Elektronikk**
2. **Hjem & Interiør**
3. **Sport & Fritid**
4. **Skjønnhet & Velvære**

Alle kategorier skal presenteres visuelt med bilde, navn og klikkbar flate.

---

# 5. Hovedkrav til UX

## 5.1 Mobil
På mobil skal brukeren kunne:

- åpne hamburgermeny fra venstre
- søke etter produkter
- åpne handlekurv
- trykke på kategorier
- trykke på produkter
- scrolle raskt og intuitivt
- forstå siden uten opplæring

## 5.2 Desktop
På desktop skal brukeren kunne:

- se tydelig toppnavigasjon
- søke med bredere søkefelt
- se kategorier og produkter i grid
- få en premium, moderne butikkfølelse
- enkelt sammenligne designvariantene

---

# 6. Designretninger

Lag tre ulike designuttrykk.

## 6.1 Design A – Hero + kategori-grid
Mål:
- enkel
- premium
- kommersiell
- lett å forstå

Struktur:
1. sticky topbar
2. hero-seksjon med stor intro
3. CTA-knapp
4. 4 kategorikort i grid
5. seksjon for utvalgte produkter
6. enkel footer

Visuell retning:
- lyst
- mye luft
- store kort
- myke skygger
- tydelige knapper

## 6.2 Design B – Editorial / lifestyle
Mål:
- mer eksklusiv
- mer visuell
- mer “interiør / designbutikk”

Struktur:
1. sticky topbar
2. visuell intro uten tung bannertekst
3. asymmetrisk kategori-layout
4. større redaksjonelle bildeflater
5. produktkort integrert mellom seksjoner
6. inspirerende, magasinaktig uttrykk

Visuell retning:
- elegant
- varm
- mer lifestyle
- mer “premium editorial”

## 6.3 Design C – App-lignende commerce
Mål:
- ekstremt lett å bruke
- veldig mobilvennlig
- tydelig “shop fast”

Struktur:
1. sticky app-lignende topbar
2. tydelig søk først
3. kategori-grid med høy klikkbarhet
4. “Utvalgte produkter”
5. “Nye produkter”
6. enkel bottom-safe spacing for mobil

Visuell retning:
- moderne
- praktisk
- rask
- ren

---

# 7. Navigasjon

## 7.1 Desktop topbar
Topbaren skal inneholde:

- logo / butikknavn
- søkefelt
- kontoikon
- handlekurvikon
- liten design-switch eller lenker til Design A / B / C

## 7.2 Mobil topbar
Mobil topbar skal inneholde:

- venstre: hamburgerknapp
- midten: butikknavn / logo
- høyre: søkeknapp + handlekurvknapp

## 7.3 Mobil drawer
Hamburgermenyen skal åpne en `Drawer` fra venstre.

Menu items:
- Hjem
- Kategorier
- Tilbud
- Nyheter
- Min konto
- Handlekurv

Alle items skal være klikkbare.

---

# 8. Shopping cart

Det skal finnes en **handlekurv-drawer**.

Krav:
- åpnes via handlekurvikon
- viser 2–3 eksempelprodukter
- viser subtotal
- har knappene:
  - `Gå til betaling`
  - `Fortsett å handle`
- viser et badge-antall på handlekurvikonet

Det er ikke nødvendig med ekte checkout-logikk, men UI må føles ekte.

---

# 9. Søk

Alle tre design må ha søk.

Krav:
- placeholder: `Søk etter produkter`
- søkeikon
- visuelt ryddig
- søkefelt i topbar på desktop
- mobil kan bruke ikon + inline field eller tydelig kompakt field
- ingen backend nødvendig

---

# 10. Klikkbarhet

Disse elementene skal være klikkbare:

- logo
- alle design-switch-lenker
- hamburgermeny-knapp
- drawer-items
- handlekurv-ikon
- alle kategorikort
- alle produktkort
- produktbilder
- “Se alle”-lenker
- CTA-knapper

Interaksjon:
- hover på desktop
- fokus-state for tastaturbruk
- subtle scale eller shadow ved hover
- pointer cursor der naturlig

---

# 11. Produktdata

Bruk mockdata i TypeScript.

Lag typer:

```ts
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
````

---

# 12. Mockdata som skal opprettes

## 12.1 Kategorier

Lag 4 kategoriobjekter:

### Elektronikk

* title: `Elektronikk`
* description: `Smartere produkter for hjem, lyd og hverdag`

### Hjem & Interiør

* title: `Hjem & Interiør`
* description: `Lys, tekstiler og detaljer for et roligere hjem`

### Sport & Fritid

* title: `Sport & Fritid`
* description: `Produkter for aktivitet, tur og trening`

### Skjønnhet & Velvære

* title: `Skjønnhet & Velvære`
* description: `Hudpleie og velværeprodukter i moderne uttrykk`

## 12.2 Eksempelprodukter

Lag minst 12 produkter totalt.

### Elektronikk

* Trådløse hodetelefoner
* Smartklokke
* Bluetooth-høyttaler

### Hjem & Interiør

* Bordlampe
* Lounge-stol
* Sengetøy

### Sport & Fritid

* Løpesko
* Yogamatte
* Treningsflaske

### Skjønnhet & Velvære

* Serum
* Ansiktskrem
* Rensegel

Alle produkter skal ha:

* tittel
* kategori
* pris
* eventuelt gammel pris
* bilde
* badge på noen av dem
* kort beskrivelse

---

# 13. Bildereferanser

Bruk disse URL-ene i mockdata:

## Elektronikk

```txt
https://images.unsplash.com/photo-1749934511277-e90042265d35?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

## Hjem & Interiør

```txt
https://images.unsplash.com/photo-1737647862097-80f014f84140?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

## Sport & Fritid

```txt
https://images.unsplash.com/photo-1705585851308-1b1080ba0144?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

Alternativ sport:

```txt
https://images.unsplash.com/photo-1676312830459-f6f13dfdd899?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

## Skjønnhet & Velvære

```txt
https://images.unsplash.com/photo-1741896135705-9dfb73461085?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

Alternativ beauty:

```txt
https://images.unsplash.com/photo-1768881187102-ca0131989c8a?auto=format&fit=crop&fm=jpg&q=80&w=1600
```

Cursor kan gjenbruke disse eller bruke dem som basis for produktene.

---

# 14. Filstruktur som skal genereres

Lag denne filstrukturen:

```txt
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

# 15. Ansvar per fil

## `theme/theme.ts`

Definer et lyst MUI-theme.

Krav:

* lys bakgrunn
* moderne typografi
* myke skygger
* border radius mellom 16 og 24
* primærfarge: dempet blå eller petrol
* sekundærfarge: varm lys tone
* god spacing
* komponentoverstyringer for `Button`, `Card`, `AppBar`, `Drawer`, `Chip`

## `data/categories.ts`

Eksporter kategoridata som array.

## `data/products.ts`

Eksporter produktdata som array.

## `routes/AppRoutes.tsx`

Definer routing:

* `/`
* `/design-a`
* `/design-b`
* `/design-c`

## `components/layout/AppShell.tsx`

Felles layout wrapper som:

* viser riktig topbar
* holder design-switcher
* har container spacing
* håndterer cart drawer state
* håndterer mobile menu drawer state

## `components/layout/DesktopTopbar.tsx`

Desktop-nav med:

* logo
* søk
* design-switch
* kontoikon
* handlekurvikon

## `components/layout/MobileTopbar.tsx`

Mobil-nav med:

* hamburger
* logo
* søk
* handlekurv

## `components/navigation/MobileMenuDrawer.tsx`

Venstrestilt `Drawer` med menyvalg.

## `components/navigation/DesignSwitcher.tsx`

Liten komponent med lenker eller tabs til:

* Design A
* Design B
* Design C

## `components/search/SearchBar.tsx`

Gjenbrukbar søkekomponent med:

* `TextField`
* `InputAdornment`
* Search icon

## `components/cart/CartDrawer.tsx`

Drawer for handlekurv.

## `components/cards/CategoryCard.tsx`

Klikkbart kategorikort med:

* bilde
* tittel
* beskrivelse
* pill/badge ved behov
* hover-effekt

## `components/cards/ProductCard.tsx`

Klikkbart produktkort med:

* bilde
* navn
* pris
* gammel pris optional
* badge optional
* knapp `Legg i handlekurv`
* favorittikon optional

## `components/sections/HeroSection.tsx`

Gjenbrukbar hero-seksjon.

## `components/sections/CategoryGridSection.tsx`

Grid for kategorier.

## `components/sections/ProductGridSection.tsx`

Grid for produktkort.

## `components/sections/EditorialShowcaseSection.tsx`

Brukes primært i Design B.

## `pages/DesignA.tsx`

Setter sammen premium hero + kategori-grid.

## `pages/DesignB.tsx`

Setter sammen editorial lifestyle-layout.

## `pages/DesignC.tsx`

Setter sammen app-lignende mobil-først layout.

---

# 16. MUI-komponenter som skal brukes

Bruk disse aktivt:

* `AppBar`
* `Toolbar`
* `Container`
* `Box`
* `Stack`
* `Grid`
* `Card`
* `CardMedia`
* `CardContent`
* `Paper`
* `Typography`
* `Button`
* `IconButton`
* `Drawer`
* `List`
* `ListItemButton`
* `Divider`
* `Chip`
* `Badge`
* `TextField`
* `InputAdornment`

Ikoner:

* `Menu`
* `Search`
* `ShoppingCart`
* `PersonOutline`
* `FavoriteBorder`
* `ChevronRight`

---

# 17. Responsivitet

Bygg mobile first.

Regler:

* mobil er default
* unngå desktop-first CSS
* bruk MUI breakpoints
* `xs` = én kolonne
* `sm` = 2 kolonner der det gir mening
* `lg` = 3–4 kolonner

Grid-regler:

* kategorikort: `xs=12`, `sm=6`
* produktkort: `xs=12`, `sm=6`, `lg=4` eller `lg=3`

Viktig:

* ingen horisontal scroll
* bilder må ha god crop
* cards må være store nok til touch
* bruk `minWidth: 0` der det trengs

---

# 18. Mobile first-regler

Disse reglene skal følges eksplisitt:

1. Mobil er basis-layout
2. Desktop er en forbedring, ikke omvendt
3. Handlekurv og hamburgermeny må fungere perfekt på liten skjerm
4. Kategorier skal være store og trykkvennlige
5. CTA-er skal være tydelige og enkle å treffe
6. Topbar på mobil skal være kompakt og tydelig
7. Bruk safe spacing nederst hvis layouten har sticky elementer

---

# 19. Safe-area og spacing

Hvis du lager sticky eller fixed elementer for mobil, legg inn støtte for safe-area nederst.

Eksempel:

```tsx
pb: "calc(12px + env(safe-area-inset-bottom))"
```

Bruk dette på:

* sticky cart CTA
* bottom spacing i app-lignende layout
* eventuelle mobile fixed bars

Ikke bruk safe-area ukritisk overalt.

---

# 20. Designregler

## 20.1 Farger

Bruk en lys palett:

* bakgrunn: offwhite / lys grå
* kort: hvite eller nesten hvite
* primær: dempet blå/petrol
* detaljer: sand / beige / lys grå

## 20.2 Typografi

* moderne sans serif
* tydelige overskrifter
* middels rolig body tekst
* ikke tung eller “corporate”

## 20.3 Kort

* avrundede hjørner
* myk shadow
* tydelig hover
* god spacing mellom elementer

## 20.4 Bilder

* store
* rene
* estetiske
* ikke mørke
* må passe moderne nettbutikk

---

# 21. Innhold i UI

Bruk norsk tekst i grensesnittet.

Eksempler:

* `Utforsk kategorier`
* `Utvalgte produkter`
* `Nye produkter`
* `Populære valg`
* `Se alle`
* `Legg i handlekurv`
* `Gå til betaling`
* `Fortsett å handle`
* `Søk etter produkter`

---

# 22. Konkrete sidekrav

## 22.1 Design A

Må inneholde:

* hero med overskrift
* undertittel
* CTA
* kategori-grid med 4 ruter
* utvalgte produkter
* lite promo-banner nederst

Forslag til hero-tekst:

* `Moderne produkter for hjem, hverdag og livsstil`
* `Utforsk et lyst og nøye kuratert vareutvalg`

## 22.2 Design B

Må inneholde:

* stor visuell introduksjon
* editorial layout
* kategoriområder i ujevnt grid
* produkter flettet inn mellom seksjoner
* mer premium look

Forslag til tekst:

* `Utforsk produkter med et rolig, moderne uttrykk`
* `Designet for kunder som vil finne frem raskt`

## 22.3 Design C

Må inneholde:

* sterk mobilfølelse
* søk tidlig i layouten
* kategori-grid med tydelig handling
* produktseksjoner med enkel browse-opplevelse
* ekstra ryddig spacing

Forslag til tekst:

* `Hva ser du etter i dag?`
* `Handle raskt blant våre mest populære kategorier`

---

# 23. State management

Hold state enkelt med React hooks.

Trengs:

* `isCartOpen`
* `isMobileMenuOpen`
* eventuelt søketekst
* eventuelt valgt design

Ingen Redux.
Ingen tung state-løsning.

---

# 24. Ikke gjør dette

Cursor skal **ikke**:

* lage et mørkt design
* lage et adminpanel
* bruke tunge tabeller
* lage utseende som ligner Norges Gass
* bygge masse custom CSS uten grunn
* lage monolittiske sider på 1000+ linjer
* gjemme dårlig responsivitet bak `overflow-x: hidden`

---

# 25. Dette skal prioriteres

1. Visuell kvalitet
2. Mobile first
3. Klikkbarhet
4. Tydelig struktur
5. Gjenbrukbare komponenter
6. Ren MUI-implementasjon
7. Ryddig filstruktur
8. Enkelt å vise frem til kunde

---

# 26. Ferdig-definisjon

Løsningen er ferdig når:

* appen starter med `npm run dev`
* alle tre rutene virker
* designene er synlig ulike
* kategorikortene er klikkbare
* produktkortene er klikkbare
* hamburgermeny virker på mobil
* handlekurv-drawer virker
* søkefelt finnes i alle design
* layouten er lys og moderne
* komponentene er ryddig delt opp
* koden er lesbar og profesjonell

---

# 27. Ekstra polish

Hvis det er tid, legg til:

* favorittikon på produktkort
* små badges som `Ny`, `Bestselger`, `Populær`
* diskret mikroanimasjon på hover
* sticky topbar
* små seksjonsoverskrifter som gir premiumfølelse
* subtile gradientflater i hero eller promo-banner

---

# 28. Startimplementasjon

Begynn i denne rekkefølgen:

1. opprett prosjektstruktur
2. lag `theme.ts`
3. lag mockdata
4. lag `AppShell`
5. lag `DesktopTopbar` og `MobileTopbar`
6. lag `MobileMenuDrawer`
7. lag `CartDrawer`
8. lag `CategoryCard`
9. lag `ProductCard`
10. lag seksjonskomponenter
11. bygg `DesignA`
12. bygg `DesignB`
13. bygg `DesignC`
14. koble routing
15. finpuss spacing, hover og mobilopplevelse

---

# 29. Instruksjon til Cursor

Generer nå hele kodebasen basert på denne spesifikasjonen.
Bruk **TypeScript**, **React Router**, **Material UI** og en ryddig komponentstruktur.
Lag en løsning som ser ut som en moderne nettbutikkdemo og som kan kjøres lokalt umiddelbart.
