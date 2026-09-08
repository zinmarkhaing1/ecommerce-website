import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div>
      <header style={{ padding: '1rem 2rem', background: '#111827', color: '#fff' }}>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <strong>Ecommerce</strong>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/dashboard">Dashboard</a>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
