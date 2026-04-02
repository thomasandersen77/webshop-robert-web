import type { CartResponseDto } from '../types/api/dto';
import { apiFetch } from './http';

export async function createBasket(token: string): Promise<CartResponseDto> {
  return apiFetch<CartResponseDto>('/api/cart', { method: 'POST', token });
}

export async function getBasket(token: string): Promise<CartResponseDto> {
  return apiFetch<CartResponseDto>('/api/cart', { method: 'GET', token });
}

export async function addCartItem(
  token: string,
  body: { productId: string; quantity: number },
): Promise<CartResponseDto> {
  return apiFetch<CartResponseDto>('/api/cart/items', {
    method: 'POST',
    token,
    body: JSON.stringify(body),
  });
}

export async function removeCartItem(token: string, productId: string): Promise<CartResponseDto> {
  return apiFetch<CartResponseDto>(
    `/api/cart/items/${encodeURIComponent(productId)}`,
    { method: 'DELETE', token },
  );
}
