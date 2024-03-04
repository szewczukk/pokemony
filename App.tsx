import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonListScreen from './components/PokemonListScreen';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PokemonListScreen />
		</QueryClientProvider>
	);
}
