import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
	PokemonList: undefined;
	PokemonModal: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export function useRootStackNavigation() {
	return useNavigation<StackNavigationProp<RootStackParamList>>();
}
