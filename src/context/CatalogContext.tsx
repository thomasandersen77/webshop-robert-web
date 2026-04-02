import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as catalogApi from '../api/catalogApi';
import { ApiError } from '../api/http';
import type { ProductCategoryPublicDto, ProductPublicDto } from '../types/api/dto';
import { flattenProducts, mapCategoryToCategoryItem } from '../utils/mapCatalog';
import type { CategoryItem, ProductItem } from '../types/shop';

type CatalogContextValue = {
  ready: boolean;
  loading: boolean;
  error: string | null;
  categoriesRaw: ProductCategoryPublicDto[];
  categoryCards: CategoryItem[];
  allProducts: ProductItem[];
  refetch: () => Promise<void>;
  getProductById: (id: string) => ProductPublicDto | undefined;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriesRaw, setCategoriesRaw] = useState<ProductCategoryPublicDto[]>([]);
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogApi.fetchProductCategories();
      setCategoriesRaw(data);
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Kunne ikke laste katalog.';
      setError(msg);
      setCategoriesRaw([]);
    } finally {
      setLoading(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const categoryCards = useMemo(
    () => categoriesRaw.map(mapCategoryToCategoryItem),
    [categoriesRaw],
  );

  const allProducts = useMemo(() => flattenProducts(categoriesRaw), [categoriesRaw]);

  const productById = useMemo(() => {
    const m = new Map<string, ProductPublicDto>();
    for (const c of categoriesRaw) {
      for (const p of c.products) {
        m.set(p.id, p);
      }
    }
    return m;
  }, [categoriesRaw]);

  const getProductById = useCallback(
    (id: string) => productById.get(id),
    [productById],
  );

  const value = useMemo(
    () => ({
      ready,
      loading,
      error,
      categoriesRaw,
      categoryCards,
      allProducts,
      refetch: load,
      getProductById,
    }),
    [ready, loading, error, categoriesRaw, categoryCards, allProducts, load, getProductById],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook
export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
