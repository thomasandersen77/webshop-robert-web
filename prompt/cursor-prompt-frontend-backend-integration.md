# Cursor prompt: frontend integration with backend API

You are implementing frontend integration for the webshop so the UI can **talk correctly to the backend API**.

You must use the existing backend-oriented prompts and rules as the source of truth for API expectations and domain flow.

## Source material you must follow

Backend rules and existing backend use cases already define the architecture and API direction.

Use these as hard constraints:

- `BACKEND_RULES.md`
- use case 1: product categories and products
- use case 2: shopping basket
- use case 3: customer account and basket ownership
- admin user stories for product category, product, and inventory as supporting domain context

Do not invent a frontend contract that conflicts with those files.

---

## Main goal

Refactor or extend the frontend so it can **reliably consume the backend API** for these flows:

1. fetch product categories and products
2. create/fetch/update basket
3. create customer account / use existing customer endpoints
4. keep frontend request/response types aligned with backend DTO contracts
5. centralize API communication so the frontend is easy to maintain

---

## Non-negotiable frontend principles

### 1. Backend is source of truth

The frontend must adapt to the backend API contract.

Do not invent alternative frontend-only business rules for:
- category ownership
- basket totals
- product pricing
- basket mutation rules
- customer ownership of basket

The backend owns those rules.

### 2. Use typed API models

Create explicit frontend request/response types that match backend DTOs.

Do not use loose `any` or ad hoc inline object literals for API payloads if reusable types are appropriate.

### 3. Centralize API access

Do not scatter raw `fetch()` calls across random components.

Create a clean API layer, for example:
- `src/api/`
- `src/services/api/`
- or existing equivalent structure if the repo already has one

Group by domain:
- categories/products
- basket/cart
- customer/auth

### 4. Keep UI and data access separate

Components should not own business/data orchestration if it can be extracted.

Preferred separation:
- UI components render state
- hooks/composables manage loading/mutation state
- API client/services perform HTTP calls
- mapping/parsing stays close to API layer

### 5. Be conservative

Reuse existing frontend structure where valid.
Create new files only where missing.
Do not refactor unrelated UI.

---

## What to inspect first

Inspect the frontend repo and verify:

1. how API calls are currently made
   - `fetch`
   - axios
   - React Query / TanStack Query
   - custom hooks
   - service modules

2. whether there is already:
   - API client
   - environment-based backend base URL
   - auth handling
   - cart/basket state store
   - category/product state loading

3. whether the current UI already expects mock/demo data

4. whether there are existing type definitions for:
   - product category
   - product
   - basket/cart
   - customer/user

5. whether the current UI routes/components already map naturally to:
   - homepage categories/products
   - basket side panel / cart drawer
   - account creation

Reuse existing code where valid.
Create new code only where missing.

Do not guess. Mark uncertainty as `MÅ VERIFISERES`.

---

## Required integration scope

## Use case 1 — categories and products

The frontend must be able to call the backend endpoints for:
- fetching all product categories
- fetching categories with their products
- optionally one category with its products if backend supports it

Expected frontend behavior:
- homepage category cards must render from backend data
- product cards must render from backend data
- empty/loading/error states must be handled explicitly
- do not hardcode catalog data if backend endpoint exists

Preferred implementation direction:
- `categoriesApi` or equivalent service
- typed response model for category-with-products
- a hook such as `useProductCategories()` if the repo already uses hooks

## Use case 2 — basket/cart

The frontend must be able to:
- create basket if needed
- add product to basket
- remove product from basket
- fetch current basket
- display total amount from backend data

Important:
- total amount must come from backend/domain rules
- frontend must not calculate canonical business totals independently
- frontend may display optimistic UI only if it does not replace backend truth

The basket drawer / side panel must be wired to the backend.

Expected frontend behavior:
- clicking add-to-cart calls backend
- basket icon count updates from current basket state
- basket drawer renders backend-backed items
- subtotal/total uses backend value
- remove action mutates backend then refreshes local state

Preferred implementation direction:
- `basketApi`
- `useBasket()` hook or existing state store
- persistent basket identity handling if backend requires basketId or authenticated user

## Use case 3 — customer account

The frontend must be able to:
- create customer account using backend endpoint
- handle request/response validation errors
- integrate with existing auth/account flow if already present
- support customer-owned basket flow if backend requires authenticated ownership

Expected frontend behavior:
- registration form submits to backend
- backend validation errors are displayed cleanly
- authenticated customer context can be reused for basket ownership if applicable

Preferred implementation direction:
- `customerApi` or `authApi`
- typed request/response models
- do not duplicate backend identity rules in frontend

---

## API integration requirements

### Base URL and environment config

Make backend base URL configurable through environment variables.

Use existing frontend conventions if present.

Examples:
- `VITE_API_BASE_URL`
- or current repo equivalent

Do not hardcode production URLs inside components.

### Error handling

Create predictable error handling for API failures:
- network error
- validation error
- not found
- unauthorized / unauthenticated
- empty state

Map backend error responses into frontend-friendly messages without throwing away useful details.

### Request/response typing

Create or update frontend types for:
- `ProductCategory`
- `Product`
- `Basket`
- `BasketItem`
- money/price DTO
- customer registration DTOs if needed

Keep these aligned to backend DTO contracts.
If backend field names differ from current frontend names, adapt via explicit mapping in the API layer.

### State synchronization

After mutations:
- refresh basket state properly
- avoid stale cart badge count
- avoid stale total amount
- avoid duplicate conflicting sources of truth

---

## UI targets visible in the screenshots

The current UI clearly contains:
- homepage hero/search
- category cards
- product cards
- cart icon with count badge
- side basket/cart drawer
- checkout CTA

Refactor the frontend so those visible UI pieces are connected to backend data instead of demo-only state where possible.

Specifically:
- category section must come from backend
- product section must come from backend
- cart drawer must come from backend
- cart subtotal must come from backend
- cart badge count must come from backend basket state

---

## Deliverables

Respond in exactly this structure:

# A. Confirmed current frontend state
List what already exists in the frontend repo.

# B. Confirmed backend contract inputs
Summarize the relevant backend expectations you are following.

# C. MÅ VERIFISERES
List only uncertainties that cannot be confirmed from the repo or provided prompts.

# D. Integration design
Explain:
- API layer structure
- hooks/state structure
- how frontend maps to backend endpoints
- how basket state stays synchronized

# E. Files to create or change
Table with:
- path
- action
- reason

# F. Full code
Show complete files or complete patches for all relevant frontend files.

This may include:
- API client
- domain-specific API modules
- hooks
- environment config usage
- category/product components
- basket drawer/cart panel
- registration form/account code
- shared types
- mapping helpers

# G. Endpoint usage map
Show which frontend file calls which backend endpoint.

# H. Manual verification steps
Provide exact steps to verify:
- categories load
- products load
- add to basket works
- remove from basket works
- basket total updates
- customer registration works

---

## Quality constraints

- no hardcoded demo catalog data if backend endpoint exists
- no scattered raw API calls across unrelated components
- typed request/response models
- backend remains source of truth
- basket total must come from backend
- reuse existing frontend code first
- do not refactor unrelated UI

---

## Anti-patterns to avoid

Do not do these:
- keep demo data as primary source when backend exists
- calculate canonical basket totals only in frontend
- duplicate backend business rules in UI
- add raw `fetch()` calls directly inside many presentational components
- introduce `any` everywhere instead of typed DTO models
- invent endpoint contracts that conflict with backend prompts
