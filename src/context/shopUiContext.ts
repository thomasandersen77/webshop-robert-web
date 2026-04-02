import { createContext } from 'react';
import type { CartLineUi, ProductItem } from '../types/shop';

export type ShopUiContextValue = {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleNav: () => void;
  openCart: () => void;
  cartLines: CartLineUi[];
  /** Delsum/total fra backend (`total.amountMinor`). */
  cartTotalMinor: number | null;
  cartLoading: boolean;
  cartError: string | null;
  addToCart: (product: ProductItem) => Promise<void>;
  removeLine: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  cartItemCount: number;
};

export const ShopUiContext = createContext<ShopUiContextValue | null>(null);
