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
					name={pokemon.name}
					height={pokemon.height}
					weight={pokemon.weight}
					spriteURL={pokemon.sprites.front_default}
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
