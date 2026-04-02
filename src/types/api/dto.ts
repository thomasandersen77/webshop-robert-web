/** Matches `ProductPublicResponse` from backend. */
export interface ProductPublicDto {
  id: string;
  name: string;
  description: string;
  priceMinor: number;
  ratingStars: number;
}

/** Matches `ProductCategoryPublicResponse`. */
export interface ProductCategoryPublicDto {
  id: string;
  name: string;
  products: ProductPublicDto[];
}

/** Matches `MoneyResponseDto` / cart money fields. */
export interface MoneyDto {
  amountMinor: number;
  currency: string;
}

/** Matches `CartItemResponseDto`. */
export interface CartItemDto {
  productId: string;
  quantity: number;
  unitPrice: MoneyDto;
  lineTotal: MoneyDto;
}

/** Matches `CartResponseDto`. */
export interface CartResponseDto {
  basketId: string;
  customerId: string;
  items: CartItemDto[];
  total: MoneyDto;
}
