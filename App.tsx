import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonListScreen from './src/screens/PokemonListScreen';
import { NavigationContainer } from '@react-navigation/native';
import PokemonModalScreen from '@/screens/PokemonModalScreen';
import { RootStack } from '@/navigation';

const queryClient = new QueryClient();

export default function App() {
	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<RootStack.Navigator>
					<RootStack.Screen name="PokemonList" component={PokemonListScreen} />
					<RootStack.Screen
						name="PokemonModal"
						component={PokemonModalScreen}
						options={{ presentation: 'modal' }}
					/>
				</RootStack.Navigator>
			</QueryClientProvider>
		</NavigationContainer>
	);
}
