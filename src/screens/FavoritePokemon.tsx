import PokemonInfo from '@/components/PokemonInfo';
import { useTabNavigation } from '@/navigation';
import { Pokemon, pokemonSchema } from '@/utils/schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

export default function FavoritePokemon() {
	const isFocused = useIsFocused();
	const navigation = useTabNavigation();
	const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

	const handleUnfavoritePressed = async () => {
		await AsyncStorage.removeItem('favorite');
		setPokemon(undefined);
	};

	useEffect(() => {
		if (pokemon === undefined) {
			navigation.goBack();
		}
	}, [pokemon]);

	useEffect(() => {
		(async () => {
			const value = await AsyncStorage.getItem('favorite');
			if (!value) {
				return;
			}

			const parsed = pokemonSchema.parse(JSON.parse(value));

			setPokemon(parsed);
		})();
	}, [isFocused]);

	if (!pokemon) {
		return (
			<SafeAreaView style={styles.container}>
				<Text>No favorite!</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<PokemonInfo
				name={pokemon.name}
				height={pokemon.height}
				weight={pokemon.weight}
				spriteURL={pokemon.sprites.front_default}
			/>
			<Button title="Unfavorite" onPress={handleUnfavoritePressed} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 16,
	},
});
