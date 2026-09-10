import { api } from '../../../shared/services/api/client';
import { endpoints } from '../../../shared/services/api/endpoints';
import type { LoginCredentials, LoginResponse } from '../types/auth';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(`${endpoints.auth}/login`, credentials);
  return response.data;
}
