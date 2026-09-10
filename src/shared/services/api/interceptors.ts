import { AxiosError, isAxiosError } from 'axios';
import { api } from './client';
import { useAppStore } from '../../../app/store';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      useAppStore.getState().clearSession();
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    const serverMessage = error.response?.data?.message;
    const fallback = isAxiosError(error)
      ? error.message
      : 'An unexpected error occurred';

    return Promise.reject(new Error(serverMessage || fallback));
  },
);
