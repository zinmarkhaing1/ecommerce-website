import { Button } from '../../../shared/components/Button';
import type { Product } from '../../../shared/types';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img className="product-card__image" src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>
        <h2 className="product-card__title">{product.title}</h2>
        <div className="product-card__meta">
          <strong>${product.price.toFixed(2)}</strong>
          <span aria-label={`${product.rating.rate} out of 5 stars`}>
            {product.rating.rate.toFixed(1)} / 5
          </span>
        </div>
        <Button variant="primary">Add to cart</Button>
      </div>
    </article>
  );
}
