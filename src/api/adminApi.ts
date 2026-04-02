import type {
  CreateCategoryRequest,
  CreateProductRequest,
  ProductCategoryResponse,
  ProductResponse,
} from '../types/admin';
import { apiFetch } from './http';

export async function createProductCategory(
  token: string,
  body: CreateCategoryRequest,
): Promise<ProductCategoryResponse> {
  return apiFetch<ProductCategoryResponse>('/api/admin/product-categories', {
    method: 'POST',
    token,
    body: JSON.stringify(body),
  });
}

export async function createProduct(
  token: string,
  body: CreateProductRequest,
): Promise<ProductResponse> {
  return apiFetch<ProductResponse>('/api/admin/products', {
    method: 'POST',
    token,
    body: JSON.stringify(body),
  });
}
