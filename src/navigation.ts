import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootNavigationParamList = {
	PokemonList: undefined;
	FavoritePokemon: undefined;
	PokemonModal: { url: string };
};

export function useRootStackNavigation() {
	return useNavigation<StackNavigationProp<RootNavigationParamList>>();
}
