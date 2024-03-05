import { SafeAreaView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function SelectPokemonScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={{ backgroundColor: theme.colors.background }}>
			<Text>Select pokemon</Text>
		</SafeAreaView>
	);
}
