import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './router/index';

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
