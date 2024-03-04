import { Text, ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '../api/get-pokemon';

type Props = {
	name: string;
	url: string;
};

export default function PokemonCard({ name, url }: Props) {
	const query = useQuery({
		queryKey: ['pokemon', url],
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
		<Pressable style={styles.container}>
			<Image
				source={{ uri: query.data?.sprites.front_default }}
				width={64}
				height={64}
			/>
			<Text>{name}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: '#f0f0f0',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});
