import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as cartApi from '../api/cartApi';
import { ApiError } from '../api/http';
import type { CartResponseDto } from '../types/api/dto';
import type { CartLineUi, ProductItem } from '../types/shop';
import { placeholderProductImage } from '../utils/placeholders';
import { useCatalog } from './CatalogContext';
import { useCustomerAuth } from './CustomerAuthContext';
import { ShopUiContext } from './shopUiContext';

function mapCartToLines(cart: CartResponseDto, getTitleImage: (productId: string) => { title: string; image: string }): CartLineUi[] {
  return cart.items.map((it) => {
    const meta = getTitleImage(it.productId);
    return {
      productId: it.productId,
      title: meta.title,
      image: meta.image,
      quantity: it.quantity,
      unitPriceMinor: it.unitPrice.amountMinor,
      lineTotalMinor: it.lineTotal.amountMinor,
    };
  });
}

async function ensureBasket(token: string): Promise<CartResponseDto> {
  try {
    return await cartApi.getBasket(token);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      try {
        return await cartApi.createBasket(token);
      } catch (e2) {
        if (e2 instanceof ApiError && e2.status === 409) {
          return cartApi.getBasket(token);
        }
        throw e2;
      }
    }
    throw e;
  }
}

export function ShopUiProvider({ children }: { children: ReactNode }) {
  const { getProductById } = useCatalog();
  const { token, ready: authReady } = useCustomerAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartResponseDto | null>(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  const metaForProduct = useCallback(
    (productId: string) => {
      const p = getProductById(productId);
      if (p) {
        return { title: p.name, image: placeholderProductImage(productId) };
      }
      return { title: `Produkt ${productId.slice(0, 8)}…`, image: placeholderProductImage(productId) };
    },
    [getProductById],
  );

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCart(null);
      return;
    }
    setCartLoading(true);
    setCartError(null);
    try {
      const next = await ensureBasket(token);
      setCart(next);
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Kunne ikke hente handlekurv.';
      setCartError(msg);
      setCart(null);
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!authReady) return;
    if (!token) {
      setCart(null);
      return;
    }
    void refreshCart();
  }, [authReady, token, refreshCart]);

  const cartLines = useMemo(() => {
    if (!cart) return [];
    return mapCartToLines(cart, metaForProduct);
  }, [cart, metaForProduct]);

  const cartTotalMinor = cart?.total.amountMinor ?? null;

  const cartItemCount = useMemo(
    () => (cart ? cart.items.reduce((n, i) => n + i.quantity, 0) : 0),
    [cart],
  );

  const toggleNav = useCallback(() => {
    setNavOpen((o) => !o);
  }, []);

  const openCart = useCallback(() => {
    setNavOpen(false);
    setCartOpen(true);
  }, []);

  const addToCart = useCallback(
    async (product: ProductItem) => {
      if (!token) {
        setCartError('Du må logge inn som kunde for å legge i handlekurv.');
        setCartOpen(false);
        return;
      }
      setNavOpen(false);
      setCartLoading(true);
      setCartError(null);
      try {
        await ensureBasket(token);
        const updated = await cartApi.addCartItem(token, { productId: product.id, quantity: 1 });
        setCart(updated);
        setCartOpen(true);
      } catch (e) {
        const msg = e instanceof ApiError ? e.message : 'Kunne ikke oppdatere handlekurv.';
        setCartError(msg);
      } finally {
        setCartLoading(false);
      }
    },
    [token],
  );

  const removeLine = useCallback(
    async (productId: string) => {
      if (!token) return;
      setCartLoading(true);
      setCartError(null);
      try {
        const updated = await cartApi.removeCartItem(token, productId);
        setCart(updated);
      } catch (e) {
        const msg = e instanceof ApiError ? e.message : 'Kunne ikke fjerne produkt.';
        setCartError(msg);
      } finally {
        setCartLoading(false);
      }
    },
    [token],
  );

  const value = useMemo(
    () => ({
      navOpen,
      setNavOpen,
      cartOpen,
      setCartOpen,
      toggleNav,
      openCart,
      cartLines,
      cartTotalMinor,
      cartLoading,
      cartError,
      addToCart,
      removeLine,
      refreshCart,
      cartItemCount,
    }),
    [
      navOpen,
      cartOpen,
      toggleNav,
      openCart,
      cartLines,
      cartTotalMinor,
      cartLoading,
      cartError,
      addToCart,
      removeLine,
      refreshCart,
      cartItemCount,
    ],
  );

  return <ShopUiContext.Provider value={value}>{children}</ShopUiContext.Provider>;
}
