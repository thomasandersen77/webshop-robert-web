import type { ProductCategoryPublicDto } from '../types/api/dto';
import { apiFetch } from './http';

export async function fetchProductCategories(): Promise<ProductCategoryPublicDto[]> {
  return apiFetch<ProductCategoryPublicDto[]>('/api/product-categories', { method: 'GET' });
}

export async function fetchProductCategoryById(
  categoryId: string,
): Promise<ProductCategoryPublicDto> {
  return apiFetch<ProductCategoryPublicDto>(`/api/product-categories/${encodeURIComponent(categoryId)}`, {
    method: 'GET',
  });
}
