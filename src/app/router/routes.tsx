import { Navigate, type RouteObject } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import HomePage from '../../features/home/pages/HomePage';
import ProductsPage from '../../features/products/pages/ProductsPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import { LoginPage } from '../../features/auth/pages';
import { AuthGuard } from './guards';

export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        element: <AuthGuard />,
        children: [{ path: '/dashboard', element: <DashboardPage /> }],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];
