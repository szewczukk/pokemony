import {
	ActivityIndicator,
	Image,
	StyleSheet,
	View,
	TouchableHighlight,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '@/api/get-pokemon';

type Props = {
	name: string;
	url: string;
	onPress: () => void;
};

export default function PokemonCard({ name, url, onPress }: Props) {
	const theme = useTheme();
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
		<TouchableHighlight onPress={onPress}>
			<View
				style={[styles.container, { backgroundColor: theme.colors.background }]}
			>
				<View style={styles.innerContainer}>
					<Image
						source={{ uri: query.data?.sprites.front_default }}
						width={64}
						height={64}
					/>
					<Text>{name}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
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
