import { useStackMapNavigation } from '@/navigation';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, {
	LatLng,
	LongPressEvent,
	Marker,
	PROVIDER_DEFAULT,
	Point,
} from 'react-native-maps';

export default function MapScreen() {
	const navigation = useStackMapNavigation();
	const [markers, setMarkers] = useState<{ id: string; coordinate: LatLng }[]>(
		[],
	);

	const handleMapLongPress = (e: LongPressEvent) => {
		e.persist();

		setMarkers((prev) => [
			...prev,
			{
				id: (
					e.nativeEvent.coordinate.latitude + e.nativeEvent.coordinate.longitude
				).toString(),
				coordinate: e.nativeEvent.coordinate,
			},
		]);
	};

	return (
		<SafeAreaView style={styles.container}>
			<MapView
				provider={PROVIDER_DEFAULT}
				style={styles.map}
				region={{
					latitude: 50.06143,
					longitude: 19.93658,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				onLongPress={handleMapLongPress}
				onMarkerPress={() => navigation.navigate('SelectPokemonModal')}
			>
				{markers.map((marker) => (
					<Marker coordinate={marker.coordinate} key={marker.id} />
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
