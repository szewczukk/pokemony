import { Pokemon } from '@/utils/schema';
import { ReactNode } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
	pokemon: Pokemon;
	onHeartPressed: () => void;
	isFavorite: boolean;
	children?: ReactNode;
};

export default function PokemonInfo({
	pokemon: {
		height,
		name,
		sprites: { front_default: spriteURL },
		weight,
	},
	children,
	isFavorite,
	onHeartPressed,
}: Props) {
	const theme = useTheme();

	return (
		<View style={styles.container}>
			<Image source={{ uri: spriteURL }} width={128} height={128} />
			<View style={styles.favoriteBarContainer}>
				<Text style={styles.name}>{name}</Text>
				<TouchableOpacity onPress={onHeartPressed}>
					{isFavorite ? (
						<Icon size={24} color={theme.colors.primary} name="heart" />
					) : (
						<Icon size={24} color={theme.colors.primary} name="hearto" />
					)}
				</TouchableOpacity>
			</View>
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
		gap: 4,
	},
	name: {
		fontWeight: 'bold',
		fontSize: 24,
	},
	favoriteBarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
});
