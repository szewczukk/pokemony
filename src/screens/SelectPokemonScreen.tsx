import PokemonCard from '@/components/PokemonCard';
import { useQueryPokemonList } from '@/hooks/useQueryPokemonList';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function SelectPokemonScreen() {
	const theme = useTheme();
	const { pokemons, fetchNextPage } = useQueryPokemonList();

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<FlatList
				data={pokemons!}
				keyExtractor={(item) => item.url}
				renderItem={({ item }) => (
					<PokemonCard
						name={item.name}
						url={item.url}
						onPress={() => console.log('hello')}
					/>
				)}
				onEndReached={() => fetchNextPage()}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		padding: 16,
	},
});
