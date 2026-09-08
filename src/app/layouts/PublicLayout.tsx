import { Outlet } from 'react-router-dom';


export function PublicLayout() {
  return (
    <>
    
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </>
  );
}
