import PokemonInfo from '@/components/PokemonInfo';
import { useTabNavigation } from '@/navigation';
import { Pokemon, pokemonSchema } from '@/utils/schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

export default function FavoritePokemon() {
	const isFocused = useIsFocused();
	const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

	useEffect(() => {
		(async () => {
			const value = await AsyncStorage.getItem('favorite');
			const parsed = pokemonSchema.parse(JSON.parse(value!));

			setPokemon(parsed);
		})();
	}, [isFocused]);

	if (!pokemon) {
		return (
			<SafeAreaView>
				<ActivityIndicator />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<PokemonInfo
				name={pokemon.name}
				height={pokemon.height}
				weight={pokemon.weight}
				spriteURL={pokemon.sprites.front_default}
			/>
		</SafeAreaView>
	);
}
