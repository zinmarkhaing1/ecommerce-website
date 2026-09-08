import { Outlet } from 'react-router-dom';
import NavBar from '../../features/navbar/components/NavBar';

export function DashboardLayout() {
  return (
    <div>
      <NavBar />
      <aside style={{ padding: '1rem', background: '#e5e7eb' }}>
        <h3>Admin Dashboard</h3>
      </aside>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
