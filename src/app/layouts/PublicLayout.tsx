import { Outlet } from 'react-router-dom';
import NavBar from '../../features/navbar/components/NavBar';

export function PublicLayout() {
  return (
    <>
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}
