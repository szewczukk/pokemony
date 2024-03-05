import PokemonCard from '@/components/PokemonCard';
import { useQueryPokemonList } from '@/hooks/useQueryPokemonList';
import { useStackMapNavigation } from '@/navigation';
import { usePokemonMarkerStore } from '@/stores/pokemon-marker';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function SelectPokemonScreen() {
	const theme = useTheme();
	const navigation = useStackMapNavigation();
	const { pokemons, fetchNextPage } = useQueryPokemonList();
	const { appendMarker, clearTemp } = usePokemonMarkerStore();

	const handlePress = (url: string) => {
		appendMarker(url);
		clearTemp();
		navigation.goBack();
	};

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
						onPress={() => handlePress(item.url)}
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
