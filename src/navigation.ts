import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackListNavigationParamList = {
	Main: undefined;
	PokemonModal: { url: string };
};

export function useListStackNavigation() {
	return useNavigation<StackNavigationProp<StackListNavigationParamList>>();
}

export type TabNavigationParamList = {
	PokemonList: undefined;
	Favorite: undefined;
	Map: undefined;
};

export function useTabNavigation() {
	return useNavigation<BottomTabNavigationProp<TabNavigationParamList>>();
}

export type StackMapNavigationParamList = {
	Map: undefined;
	SelectPokemonModal: undefined;
};

export function useStackMapNavigation() {
	return useNavigation<StackNavigationProp<StackMapNavigationParamList>>();
}
