import {
	Text,
	ActivityIndicator,
	Image,
	StyleSheet,
	View,
	TouchableHighlight,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '@/api/get-pokemon';
import { useRootStackNavigation } from '@/navigation';

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
				<Image
					source={{ uri: query.data?.sprites.front_default }}
					width={64}
					height={64}
				/>
				<Text>{name}</Text>
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
		gap: 8,
	},
	pressed: {
		backgroundColor: '#e0e0e0',
	},
});
