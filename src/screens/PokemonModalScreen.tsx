import { getPokemon } from '@/api/get-pokemon';
import PokemonInfo from '@/components/PokemonInfo';
import { StackNavigationParamList, useRootStackNavigation } from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

type Props = NativeStackScreenProps<StackNavigationParamList, 'PokemonModal'>;

export default function PokemonModalScreen({ route }: Props) {
	const { url } = route.params;

	const [isFavorite, setIsFavorite] = useState(false);
	const navigation = useRootStackNavigation();
	const { isLoading, data } = useQuery({
		queryKey: [url],
		queryFn: () => getPokemon(url),
	});

	const handleCloseButtonPressed = () => {
		navigation.goBack();
	};

	const handleFavoriteButtonPressed = async () => {
		await AsyncStorage.setItem('favorite_url', url);
		navigation.goBack();
	};

	const handleUnfavorite = async () => {
		await AsyncStorage.removeItem('favorite_url');
		setIsFavorite(false);
		navigation.goBack();
	};

	useEffect(() => {
		(async () => {
			const value = await AsyncStorage.getItem('favorite_url');
			if (!value) {
				return;
			}

			setIsFavorite(value === url);
		})();
	}, [url]);

	if (isLoading || !data) {
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PokemonInfo
				weight={data?.weight}
				height={data.height}
				name={data.name}
				spriteURL={data.sprites.front_default}
			/>
			{isFavorite ? (
				<Button onPress={handleUnfavorite}>Unfavorite</Button>
			) : (
				<Button onPress={handleFavoriteButtonPressed}>Favorite</Button>
			)}
			<Button onPress={handleCloseButtonPressed}>Close</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 8,
	},
});
