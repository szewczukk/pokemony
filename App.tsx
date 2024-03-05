import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonListScreen from './src/screens/PokemonListScreen';
import { NavigationContainer } from '@react-navigation/native';
import PokemonModalScreen from '@/screens/PokemonModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	StackMapNavigationParamList,
	StackListNavigationParamList,
	TabNavigationParamList,
} from '@/navigation';
import FavoritePokemonScreen from '@/screens/FavoritePokemonScreen';
import { PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import MapScreen from '@/screens/MapScreen';
import SelectPokemonScreen from '@/screens/SelectPokemonScreen';

const queryClient = new QueryClient();

const StackListNavigator =
	createNativeStackNavigator<StackListNavigationParamList>();
const StackMapNavigator =
	createNativeStackNavigator<StackMapNavigationParamList>();
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
								<StackListNavigator.Navigator>
									<StackListNavigator.Screen
										name="Main"
										component={PokemonListScreen}
									/>
									<StackListNavigator.Screen
										name="PokemonModal"
										component={PokemonModalScreen}
										options={{ presentation: 'modal' }}
									/>
								</StackListNavigator.Navigator>
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
								<StackMapNavigator.Navigator>
									<StackMapNavigator.Screen name="Main" component={MapScreen} />
									<StackMapNavigator.Screen
										name="SelectPokemonModal"
										component={SelectPokemonScreen}
										options={{ presentation: 'modal' }}
									/>
									<StackListNavigator.Screen
										name="PokemonModal"
										component={PokemonModalScreen}
										options={{ presentation: 'modal' }}
									/>
								</StackMapNavigator.Navigator>
							)}
						</TabNavigator.Screen>
					</TabNavigator.Navigator>
				</QueryClientProvider>
			</NavigationContainer>
		</PaperProvider>
	);
}
