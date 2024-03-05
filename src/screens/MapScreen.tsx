import { useStackMapNavigation } from '@/navigation';
import { usePokemonMarkerStore } from '@/stores/pokemon-marker';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, {
	LongPressEvent,
	Marker,
	PROVIDER_DEFAULT,
} from 'react-native-maps';

export default function MapScreen() {
	const navigation = useStackMapNavigation();
	const { setCoordinates, markers } = usePokemonMarkerStore();

	const handleMapLongPress = (e: LongPressEvent) => {
		e.persist();

		setCoordinates(e.nativeEvent.coordinate);
		navigation.navigate('SelectPokemonModal');
	};

	const handleMarkerPressed = (markerId: string) => {
		const selectedUrl = markers.find(
			(marker) => marker.id === markerId,
		)!.pokemonUrl;

		navigation.navigate('PokemonModal', { url: selectedUrl });
	};

	return (
		<SafeAreaView style={styles.container}>
			<MapView
				provider={PROVIDER_DEFAULT}
				style={styles.map}
				region={{
					latitude: 50.06143,
					longitude: 19.93658,
					latitudeDelta: 0.02,
					longitudeDelta: 0.02,
				}}
				onLongPress={handleMapLongPress}
			>
				{markers.map((marker) => (
					<Marker
						coordinate={marker.coordinate}
						key={marker.id}
						onPress={() => handleMarkerPressed(marker.id)}
					/>
				))}
			</MapView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
