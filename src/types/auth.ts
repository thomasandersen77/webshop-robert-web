export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface UserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface TokenResponseDto {
  accessToken: string;
  tokenType: string;
  user: UserResponseDto;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}
