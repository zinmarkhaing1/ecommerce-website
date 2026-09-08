import { api } from '../../../shared/services/api/client';
import { mapProduct, ProductDto } from '../../../shared/services/productMapper';
import type { Product } from '../../../shared/types';

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<ProductDto[]>('/products');
  return data.map(mapProduct);
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<ProductDto>(`/products/${id}`);
  return mapProduct(data);
}
