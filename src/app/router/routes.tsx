import { Navigate } from 'react-router-dom';
import HomePage from '../../features/home/pages/HomePage';
import ProductsPage from '../../features/products/pages/ProductsPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';

export const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
