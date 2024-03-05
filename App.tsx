import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonListScreen from './src/screens/PokemonListScreen';
import { NavigationContainer } from '@react-navigation/native';
import PokemonModalScreen from '@/screens/PokemonModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	StackMapNavigationParamList,
	StackNavigationParamList,
	TabNavigationParamList,
} from '@/navigation';
import FavoritePokemonScreen from '@/screens/FavoritePokemonScreen';
import { PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import MapScreen from '@/screens/MapScreen';
import SelectPokemonScreen from '@/screens/SelectPokemonScreen';

const queryClient = new QueryClient();

const StackNavigator = createNativeStackNavigator<StackNavigationParamList>();
const MapNavigator = createNativeStackNavigator<StackMapNavigationParamList>();
const TabNavigator = createMaterialBottomTabNavigator<TabNavigationParamList>();

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<QueryClientProvider client={queryClient}>
					<TabNavigator.Navigator>
						<TabNavigator.Screen
							name="PokemonList"
							options={{
								tabBarIcon: ({ color, focused }) =>
									focused ? (
										<Icon color={color} size={24} name="infocirlce" />
									) : (
										<Icon color={color} size={24} name="infocirlceo" />
									),
							}}
						>
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
						<TabNavigator.Screen
							name="Favorite"
							component={FavoritePokemonScreen}
							options={{
								tabBarIcon: ({ color, focused }) =>
									focused ? (
										<Icon color={color} size={24} name="heart" />
									) : (
										<Icon color={color} size={24} name="hearto" />
									),
							}}
						/>
						<TabNavigator.Screen
							name="Map"
							options={{
								tabBarIcon: ({ color, focused }) =>
									focused ? (
										<Icon color={color} size={24} name="earth" />
									) : (
										<Icon color={color} size={24} name="earth" />
									),
							}}
						>
							{() => (
								<MapNavigator.Navigator>
									<MapNavigator.Screen name="Map" component={MapScreen} />
									<MapNavigator.Screen
										name="SelectPokemonModal"
										component={SelectPokemonScreen}
										options={{ presentation: 'modal' }}
									/>
								</MapNavigator.Navigator>
							)}
						</TabNavigator.Screen>
					</TabNavigator.Navigator>
				</QueryClientProvider>
			</NavigationContainer>
		</PaperProvider>
	);
}
