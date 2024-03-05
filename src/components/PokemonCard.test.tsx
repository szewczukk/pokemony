import '@testing-library/react-native/extend-expect';
import '@testing-library/jest-native/extend-expect';
import { render, act, fireEvent } from '@testing-library/react-native';

import PokemonCard from './PokemonCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('<PokemonCard />', () => {
	it('Calls onPress upon press', () => {
		const stub = jest.fn();
		const queryClient = new QueryClient();
		queryClient.setQueryData(['https://pokeapi.co/api/v2/pokemon/1'], {
			name: 'bulbasaur',
			height: 7,
			weight: 69,
			sprites: {
				front_default:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
			},
		});

		const { getByText } = render(
			<QueryClientProvider client={queryClient}>
				<PokemonCard
					name="bulbasaur"
					onPress={() => stub()}
					url="https://pokeapi.co/api/v2/pokemon/1"
				/>
			</QueryClientProvider>,
		);

		const title = getByText('bulbasaur');

		act(() => {
			fireEvent.press(title);
		});

		expect(stub).toHaveBeenCalled();
	});

	it('Renders activity indicator when no cache is present', () => {
		const stub = jest.fn();
		const queryClient = new QueryClient();

		const { getByTestId } = render(
			<QueryClientProvider client={queryClient}>
				<PokemonCard
					name="bulbasaur"
					onPress={() => stub()}
					url="https://pokeapi.co/api/v2/pokemon/1"
				/>
			</QueryClientProvider>,
		);

		const activityIndicator = getByTestId('indicator');

		expect(activityIndicator).toBeOnTheScreen();
	});
});
