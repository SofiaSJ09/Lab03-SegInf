import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RiskCalculator } from './pages/RiskCalculator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RiskCalculator />
    </QueryClientProvider>
  );
}

export default App;
