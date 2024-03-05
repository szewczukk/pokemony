import { getPokemon } from '@/api/get-pokemon';
import PokemonInfo from '@/components/PokemonInfo';
import { useTabNavigation } from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

export default function FavoritePokemon() {
	const navigation = useTabNavigation();
	const [pokemonUrl, setPokemonUrl] = useState<string | undefined>(undefined);
	const { data } = useQuery({
		queryKey: [pokemonUrl],
		queryFn: () => getPokemon(pokemonUrl || ''),
	});

	const handleUnfavoritePressed = () => {
		AsyncStorage.removeItem('favorite_url', () => {
			setPokemonUrl('');
			navigation.goBack();
		});
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			AsyncStorage.getItem('favorite_url', (err, result) => {
				if (!result) {
					setPokemonUrl(undefined);
					return;
				}

				setPokemonUrl(result);
			});
		});

		return unsubscribe;
	}, [navigation]);

	if (!data) {
		return (
			<SafeAreaView style={styles.container}>
				<Text>No favorite!</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<PokemonInfo
				name={data.name}
				height={data.height}
				weight={data.weight}
				spriteURL={data.sprites.front_default}
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
