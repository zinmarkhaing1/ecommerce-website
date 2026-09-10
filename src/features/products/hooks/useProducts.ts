import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';

export const productsQueryKey = ['products'] as const;

export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: getProducts,
  });
}