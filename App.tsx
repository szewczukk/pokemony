import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonListScreen from './src/screens/PokemonListScreen';
import { NavigationContainer } from '@react-navigation/native';
import PokemonModalScreen from '@/screens/PokemonModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationParamList, TabNavigationParamList } from '@/navigation';
import FavoritePokemon from '@/screens/FavoritePokemon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient();

const StackNavigator = createNativeStackNavigator<StackNavigationParamList>();
const TabNavigator = createBottomTabNavigator<TabNavigationParamList>();

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<QueryClientProvider client={queryClient}>
					<TabNavigator.Navigator
						screenOptions={{
							headerShown: false,
						}}
					>
						<TabNavigator.Screen name="PokemonList">
							{() => (
								<StackNavigator.Navigator
									screenOptions={{ headerShown: false }}
								>
									<StackNavigator.Screen
										name="Main"
										component={PokemonListScreen}
									/>
									<StackNavigator.Screen
										name="PokemonModal"
										component={PokemonModalScreen}
										options={{ presentation: 'modal' }}
									/>
								</StackNavigator.Navigator>
							)}
						</TabNavigator.Screen>
						<TabNavigator.Screen name="Favorite" component={FavoritePokemon} />
					</TabNavigator.Navigator>
				</QueryClientProvider>
			</NavigationContainer>
		</PaperProvider>
	);
}
