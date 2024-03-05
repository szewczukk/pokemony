import { ReactNode } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
	weight: number;
	height: number;
	name: string;
	spriteURL: string;
	children: ReactNode;
};

export default function PokemonInfo({
	spriteURL,
	height,
	name,
	weight,
	children,
}: Props) {
	return (
		<View style={styles.container}>
			<Image source={{ uri: spriteURL }} width={128} height={128} />
			<Text style={styles.name}>{name}</Text>
			<Text>{height / 10}m</Text>
			<Text>{weight / 10}kg</Text>
			{children}
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
