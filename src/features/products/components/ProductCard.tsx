import { Button } from '../../../shared/components/Button';

type ProductCardProps = {
  name: string;
  price: number;
};

export function ProductCard({ name, price }: ProductCardProps) {
  return (
    <article
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '1rem',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <h3>{name}</h3>
      <p>${price}</p>
      <Button variant="primary">Add to cart</Button>
    </article>
  );
}
