import { getPokemon } from '@/api/get-pokemon';
import { RootStackParamList, useRootStackNavigation } from '@/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import {
	StyleSheet,
	ActivityIndicator,
	Text,
	View,
	Image,
	Button,
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonModal'>;

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

	if (isLoading) {
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: data?.sprites.front_default }}
				width={128}
				height={128}
			/>
			<Text style={styles.name}>{data?.name}</Text>
			<Text>{data!.height / 10}m</Text>
			<Text>{data!.weight / 10}kg</Text>
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
	name: {
		fontWeight: 'bold',
		fontSize: 24,
	},
});
