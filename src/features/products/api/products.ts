import { api } from '../../../shared/services/api/client';
import { endpoints } from '../../../shared/services/api/endpoints';
import { mapProduct, type ProductDto } from '../../../shared/services/productMapper';
import type { Product } from '../../../shared/types';

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<ProductDto[]>(endpoints.products);
  return data.map(mapProduct);
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<ProductDto>(`${endpoints.products}/${id}`);
  return mapProduct(data);
}
