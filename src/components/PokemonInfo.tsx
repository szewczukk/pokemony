import { View, StyleSheet, Text, Image } from 'react-native';

type Props = {
	weight: number;
	height: number;
	name: string;
	spriteURL: string;
};

export default function PokemonInfo({
	spriteURL,
	height,
	name,
	weight,
}: Props) {
	return (
		<View style={styles.container}>
			<Image source={{ uri: spriteURL }} width={128} height={128} />
			<Text style={styles.name}>{name}</Text>
			<Text>{height / 10}m</Text>
			<Text>{weight / 10}kg</Text>
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
