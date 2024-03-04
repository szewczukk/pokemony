import { getPokemon } from '@/api/get-pokemon';
import PokemonInfo from '@/components/PokemonInfo';
import { StackNavigationParamList, useRootStackNavigation } from '@/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet, ActivityIndicator, View, Button } from 'react-native';

type Props = NativeStackScreenProps<StackNavigationParamList, 'PokemonModal'>;

export default function PokemonModalScreen({ route }: Props) {
	const { url } = route.params;

	const navigation = useRootStackNavigation();
	const { isLoading, data } = useQuery({
		queryKey: [url],
		queryFn: () => getPokemon(url),
	});

	const handleCloseButtonPressed = () => {
		navigation.goBack();
	};

	if (isLoading || !data) {
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PokemonInfo
				weight={data?.weight}
				height={data.height}
				name={data.name}
				spriteURL={data.sprites.front_default}
			/>
			<Button title="Close" onPress={handleCloseButtonPressed} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 8,
	},
});
