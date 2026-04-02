import type { LoginRequestDto, TokenResponseDto } from '../types/auth';
import { apiFetch } from './http';

/** POST /api/customers — same body as register; returns JWT + user. */
export async function registerCustomer(body: { email: string; password: string }): Promise<TokenResponseDto> {
  return apiFetch<TokenResponseDto>('/api/customers', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function loginCustomer(body: LoginRequestDto): Promise<TokenResponseDto> {
  return apiFetch<TokenResponseDto>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
