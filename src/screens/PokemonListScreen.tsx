import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { getPokemons } from '@/api/get-pokemons';
import PokemonCard from '@/components/PokemonCard';
import { useListStackNavigation } from '@/navigation';
import { API_BASE_URL } from '@/utils/constants';

export default function PokemonListScreen() {
	const theme = useTheme();
	const navigation = useListStackNavigation();
	const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
		queryFn: getPokemons,
		queryKey: ['pokemons'],
		getNextPageParam: (lastPage) => lastPage.next,
		initialPageParam: `${API_BASE_URL}/pokemon?limit=20offset=0`,
	});

	if (isError) {
		return <Text>Error..</Text>;
	}

	if (isLoading) {
		return <ActivityIndicator />;
	}

	const pokemons = data?.pages.flatMap((page) => page.results)!;

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<StatusBar style="auto" />
			<FlatList
				data={pokemons}
				keyExtractor={(item) => item.url}
				renderItem={({ item }) => (
					<PokemonCard
						name={item.name}
						url={item.url}
						onPress={() =>
							navigation.navigate('PokemonModal', { url: item.url })
						}
					/>
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
