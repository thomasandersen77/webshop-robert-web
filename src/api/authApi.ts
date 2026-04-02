import type { LoginRequestDto, TokenResponseDto, UserResponseDto } from '../types/auth';
import { apiFetch } from './http';

export async function login(body: LoginRequestDto): Promise<TokenResponseDto> {
  return apiFetch<TokenResponseDto>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function fetchCurrentUser(token: string): Promise<UserResponseDto> {
  return apiFetch<UserResponseDto>('/api/auth/me', {
    method: 'GET',
    token,
  });
}
