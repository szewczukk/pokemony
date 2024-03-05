import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

type Marker = { id: string; coordinate: LatLng; pokemonUrl: string };
type CurrentlyCreatingMarker = Omit<Marker, 'pokemonUrl'> | undefined;

type MarkerStore = {
	markers: Marker[];
	currentlyCreatingMarker: CurrentlyCreatingMarker;

	setCoordinates: (cooridanate: LatLng) => void;
	appendMarker: (pokemonUrl: string) => void;
	clearTemp: () => void;
};

export const usePokemonMarkerStore = create<MarkerStore>((set) => ({
	markers: [],
	currentlyCreatingMarker: undefined,

	setCoordinates: (coordinate) =>
		set((state) => ({
			markers: state.markers,
			currentlyCreatingMarker: {
				id: (coordinate.latitude + coordinate.longitude).toString(),
				coordinate,
			},
		})),

	appendMarker: (pokemonUrl: string) =>
		set((state) => ({
			markers: [
				...state.markers,
				{
					id: state.currentlyCreatingMarker!.id,
					coordinate: state.currentlyCreatingMarker!.coordinate,
					pokemonUrl,
				},
			],
		})),

	clearTemp: () =>
		set((state) => ({
			markers: state.markers,
			currentlyCreatingMarker: undefined,
		})),
}));
