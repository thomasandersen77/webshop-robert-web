import type { ProductCategoryPublicDto, ProductPublicDto } from '../types/api/dto';
import type { CategoryItem, ProductBadge, ProductItem } from '../types/shop';
import { placeholderCategoryImage, placeholderProductImage } from './placeholders';

function badgeFromRating(rating: number): ProductBadge | undefined {
  if (rating >= 5) return 'Bestselger';
  if (rating <= 2) return 'Ny';
  if (rating === 4) return 'Populær';
  return undefined;
}

export function mapProductToProductItem(p: ProductPublicDto, categoryId: string): ProductItem {
  return {
    id: p.id,
    title: p.name,
    category: categoryId,
    price: p.priceMinor / 100,
    image: placeholderProductImage(p.id),
    shortDescription: p.description,
    badge: badgeFromRating(p.ratingStars),
  };
}

export function mapCategoryToCategoryItem(c: ProductCategoryPublicDto): CategoryItem {
  return {
    id: c.id,
    title: c.name,
    description:
      c.products[0]?.description?.slice(0, 90) ??
      `Utforsk ${c.products.length} produkt${c.products.length === 1 ? '' : 'er'} i denne kategorien.`,
    image: placeholderCategoryImage(c.id),
    href: `#${c.id}`,
    badge: undefined,
  };
}

export function flattenProducts(categories: ProductCategoryPublicDto[]): ProductItem[] {
  const out: ProductItem[] = [];
  for (const c of categories) {
    for (const p of c.products) {
      out.push(mapProductToProductItem(p, c.id));
    }
  }
  return out;
}
