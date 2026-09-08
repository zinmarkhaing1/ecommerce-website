import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div>
      <aside style={{ padding: '1rem', background: '#e5e7eb' }}>
        <h3>Admin Dashboard</h3>
      </aside>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
