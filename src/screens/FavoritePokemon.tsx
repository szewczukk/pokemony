import { getPokemon } from '@/api/get-pokemon';
import PokemonInfo from '@/components/PokemonInfo';
import { useTabNavigation } from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function FavoritePokemon() {
	const navigation = useTabNavigation();
	const [pokemonUrl, setPokemonUrl] = useState<string | undefined>(undefined);
	const { data } = useQuery({
		queryKey: [pokemonUrl],
		queryFn: () => getPokemon(pokemonUrl || ''),
	});

	const handleUnfavoritePressed = async () => {
		await AsyncStorage.removeItem('favorite_url');
		setPokemonUrl('');
		navigation.goBack();
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			const url = await AsyncStorage.getItem('favorite_url');
			if (!url) {
				setPokemonUrl(undefined);
				return;
			}

			setPokemonUrl(url);
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
				onHeartPressed={handleUnfavoritePressed}
				isFavorite
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 16,
	},
});
