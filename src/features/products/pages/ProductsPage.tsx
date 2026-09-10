import {Box, Typography} from "@mui/material";
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export default function ProductsPage() {
  const { data: products = [], isLoading, isError, refetch } = useProducts();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim().toLowerCase() ?? '';
  const category = searchParams.get('search')?.trim().toLowerCase() ?? '';
  const filteredProducts = products.filter((product) => {
    const matchesTitle = !query || product.title.toLowerCase().includes(query);
    const matchesCategory = !category || product.category.toLowerCase() === category;

    return matchesTitle && matchesCategory;
  });

  if (isLoading) {
    return (
      <section className="products-page" aria-labelledby="products-heading">
        <div className="products-page__intro">
          <p className="eyebrow">The collection</p>
          <h1 id="products-heading">Find your next favorite.</h1>
          <p>Curated pieces for everyday expression.</p>
        </div>
        <p className="products-page__status" role="status">Loading products...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="products-page" aria-labelledby="products-heading">
        <div className="products-page__intro">
          <p className="eyebrow">The collection</p>
          <h1 id="products-heading">Find your next favorite.</h1>
        </div>
        <div className="products-page__status products-page__status--error" role="alert">
          <p>We could not load the collection right now.</p>
          <button type="button" onClick={() => refetch()}>Try again</button>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="products-page" aria-labelledby="products-heading">
        <div className="products-page__intro">
          <p className="eyebrow">The collection</p>
          <h1 id="products-heading">Find your next favorite.</h1>
        </div>
        <p className="products-page__status">There are no products to show yet.</p>
      </section>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <section className="products-page" aria-labelledby="products-heading">
        <div className="products-page__intro">
          <p className="eyebrow">The collection</p>
          <h1 id="products-heading">Find your next favorite.</h1>
        </div>
        <p className="products-page__status">
          No products found for the selected filters.
        </p>
      </section>
    );
  }

  return (
    // <section className="products-page" aria-labelledby="products-heading">
    //   <div className="products-page__intro">
    //     <p className="eyebrow">The collection</p>
    //     <h1 id="products-heading">Find your next favorite.</h1>
    //     <p>Curated pieces for everyday expression.</p>
    //   </div>
    //   <div className="products-grid">
    //     {products.map((product) => <ProductCard key={product.id} product={product} />)}
    //   </div>
    // </section>
   <Box
  component="section"
  aria-labelledby="products-heading"
  sx={{
    py: { xs: 4, md: 8 },
    px: { xs: 2, md: 4 },
  }}
>
  <Box sx={{ mb: 5 }}>
    <Typography
      variant="overline"
      component="p"
      sx={{
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: "text.secondary",
      }}
    >
      The collection
    </Typography>

    <Typography
      id="products-heading"
      component="h1"
      variant="h2"
      sx={{
        fontWeight: 700,
        mb: 1,
      }}
    >
      Find your next favorite.
    </Typography>

    <Typography variant="body1" color="text.secondary">
      Curated pieces for everyday expression.
    </Typography>
  </Box>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      },
      gap: 3,
    }}
  >
    {filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </Box>
</Box>
  );
}
