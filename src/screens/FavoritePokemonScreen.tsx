import { getPokemon } from '@/api/get-pokemon';
import FavoritePokemon from '@/components/FavoritePokemon';
import { useTabNavigation } from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function FavoritePokemonScreen() {
	const navigation = useTabNavigation();
	const [pokemonUrl, setPokemonUrl] = useState<string | undefined>(undefined);
	const { data } = useQuery({
		queryKey: [pokemonUrl],
		queryFn: () => getPokemon(pokemonUrl || ''),
	});

	const handleHeartPressed = async () => {
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

	return <FavoritePokemon pokemon={data} onHeartPressed={handleHeartPressed} />;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 16,
	},
});
