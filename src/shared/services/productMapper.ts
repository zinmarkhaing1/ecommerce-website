export type ProductDto = {
  id: number;
  name: string;
  price: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};

export function mapProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.name,
    price: dto.price,
  };
}
