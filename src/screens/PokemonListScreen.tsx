import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { getPokemons } from '@/api/get-pokemons';
import PokemonCard from '@/components/PokemonCard';

export default function PokemonListScreen() {
	const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
		queryFn: getPokemons,
		queryKey: ['pokemons'],
		getNextPageParam: (lastPage) => lastPage.next,
		initialPageParam: 'https://pokeapi.co/api/v2/pokemon?limit=20offset=0',
	});

	if (isError) {
		return <Text>Error..</Text>;
	}

	if (isLoading) {
		return <ActivityIndicator />;
	}

	const pokemons = data?.pages.flatMap((page) => page.results)!;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<FlatList
				data={pokemons}
				keyExtractor={(item) => item.url}
				renderItem={({ item }) => (
					<PokemonCard name={item.name} url={item.url} />
				)}
				onEndReached={() => fetchNextPage()}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
	},
});
