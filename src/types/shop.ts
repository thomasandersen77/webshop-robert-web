export type CategoryKey = string;

export interface CategoryItem {
  id: CategoryKey;
  title: string;
  description: string;
  image: string;
  /** Hash only, e.g. `#<uuid>` — combined with current route in navigation */
  href: string;
  badge?: string;
}

export type ProductBadge = 'Ny' | 'Populær' | 'Bestselger';

export interface ProductItem {
  id: string;
  title: string;
  category: CategoryKey;
  /** Visningspris i hovedvaluta (kr); API bruker minor units — mappes i API-lag. */
  price: number;
  oldPrice?: number;
  image: string;
  badge?: ProductBadge;
  shortDescription: string;
}

/** Handlekurvlinje for UI — tall fra backend (minor) der det er relevant. */
export interface CartLineUi {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  unitPriceMinor: number;
  lineTotalMinor: number;
}
