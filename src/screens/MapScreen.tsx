import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

export default function MapScreen() {
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
			></MapView>
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
