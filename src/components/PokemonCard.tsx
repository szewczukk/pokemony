import {
	Text,
	ActivityIndicator,
	Image,
	StyleSheet,
	View,
	TouchableHighlight,
	Button,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '@/api/get-pokemon';
import { useRootStackNavigation } from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
	name: string;
	url: string;
};

export default function PokemonCard({ name, url }: Props) {
	const navigation = useRootStackNavigation();
	const query = useQuery({
		queryKey: [url],
		queryFn: () => getPokemon(url),
	});

	const handleFavoriteButtonPressed = async () => {
		try {
			await AsyncStorage.setItem('favorite', JSON.stringify(query.data));
		} catch (e) {
			console.error(e);
		}
	};

	if (query.isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<TouchableHighlight
			onPress={() => navigation.navigate('PokemonModal', { url })}
		>
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Image
						source={{ uri: query.data?.sprites.front_default }}
						width={64}
						height={64}
					/>
					<Text>{name}</Text>
				</View>
				<Button title="Favorite" onPress={handleFavoriteButtonPressed} />
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: '#f0f0f0',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	innerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
