import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackNavigationParamList = {
	Main: undefined;
	PokemonModal: { url: string };
};

export function useRootStackNavigation() {
	return useNavigation<StackNavigationProp<StackNavigationParamList>>();
}

export type TabNavigationParamList = {
	PokemonList: undefined;
	Favorite: undefined;
	Map: undefined;
};

export function useTabNavigation() {
	return useNavigation<BottomTabNavigationProp<TabNavigationParamList>>();
}
