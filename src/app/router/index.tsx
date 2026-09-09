import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

export function AppRouter() {
  return useRoutes(routes);
}
