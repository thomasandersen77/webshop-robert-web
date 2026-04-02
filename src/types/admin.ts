export interface CreateCategoryRequest {
  name: string;
}

export interface ProductCategoryResponse {
  id: string;
  name: string;
}

export interface CreateProductRequest {
  categoryId: string;
  name: string;
  description: string;
  priceMinor: number;
  ratingStars: number;
}

export interface ProductResponse {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  priceMinor: number;
  ratingStars: number;
}
