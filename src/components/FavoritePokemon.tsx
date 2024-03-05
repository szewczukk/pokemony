import { Pokemon } from '@/utils/schema';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PokemonInfo from './PokemonInfo';

type Props = {
	pokemon: Pokemon | undefined;
	onHeartPressed: () => void;
};

export default function FavoritePokemon({ pokemon, onHeartPressed }: Props) {
	return (
		<SafeAreaView style={styles.container}>
			{pokemon ? (
				<PokemonInfo
					pokemon={pokemon}
					onHeartPressed={onHeartPressed}
					isFavorite
				/>
			) : (
				<Text>No favorite!</Text>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 16,
	},
});
