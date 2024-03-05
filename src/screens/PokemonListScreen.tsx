import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import PokemonCard from '@/components/PokemonCard';
import { useListStackNavigation } from '@/navigation';
import { useQueryPokemonList } from '@/hooks/useQueryPokemonList';

export default function PokemonListScreen() {
	const theme = useTheme();
	const navigation = useListStackNavigation();
	const { pokemons, isError, isLoading, fetchNextPage } = useQueryPokemonList();

	if (isError) {
		return <Text>Error..</Text>;
	}

	if (isLoading) {
		return <ActivityIndicator />;
	}

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
