import { getPokemon } from '@/api/get-pokemon';
import PokemonInfo from '@/components/PokemonInfo';
import {
	StackListNavigationParamList,
	useListStackNavigation,
} from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';

type Props = NativeStackScreenProps<
	StackListNavigationParamList,
	'PokemonModal'
>;

export default function PokemonModalScreen({ route }: Props) {
	const { url } = route.params;

	const theme = useTheme();
	const [isFavorite, setIsFavorite] = useState(false);
	const navigation = useListStackNavigation();
	const { isLoading, data } = useQuery({
		queryKey: [url],
		queryFn: () => getPokemon(url),
	});

	const handleCloseButtonPressed = () => {
		navigation.goBack();
	};

	const handleFavoriteButtonPressed = async () => {
		await AsyncStorage.setItem('favorite_url', url);
		setIsFavorite(true);
	};

	const handleUnfavorite = async () => {
		await AsyncStorage.removeItem('favorite_url');
		setIsFavorite(false);
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
		<View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<PokemonInfo
				pokemon={data}
				onHeartPressed={
					isFavorite ? handleUnfavorite : handleFavoriteButtonPressed
				}
				isFavorite={isFavorite}
			>
				<Button onPress={handleCloseButtonPressed}>Close</Button>
			</PokemonInfo>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'stretch',
		height: '100%',
		padding: 8,
	},
});
