import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonListScreen from './src/screens/PokemonListScreen';
import { NavigationContainer } from '@react-navigation/native';
import PokemonModalScreen from '@/screens/PokemonModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigationParamList } from '@/navigation';
import FavoritePokemon from '@/screens/FavoritePokemon';

const queryClient = new QueryClient();

const RootNavigation = createNativeStackNavigator<RootNavigationParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<RootNavigation.Navigator>
					<RootNavigation.Screen
						name="PokemonList"
						component={PokemonListScreen}
					/>
					<RootNavigation.Screen
						name="PokemonModal"
						component={PokemonModalScreen}
						options={{ presentation: 'modal' }}
					/>
					<RootNavigation.Screen
						name="FavoritePokemon"
						component={FavoritePokemon}
					/>
				</RootNavigation.Navigator>
			</QueryClientProvider>
		</NavigationContainer>
	);
}
