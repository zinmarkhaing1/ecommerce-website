import { Navigate, type RouteObject } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import HomePage from '../../features/home/pages/HomePage';
import ProductsPage from '../../features/products/pages/ProductsPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';

export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [{ path: '/dashboard', element: <DashboardPage /> }],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];
