import { getPokemons } from '@/api/get-pokemons';
import { API_BASE_URL } from '@/utils/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useQueryPokemonList() {
	const { data, ...rest } = useInfiniteQuery({
		queryFn: getPokemons,
		queryKey: ['pokemons'],
		getNextPageParam: (lastPage) => lastPage.next,
		initialPageParam: `${API_BASE_URL}/pokemon?limit=20offset=0`,
	});
	const pokemons = data?.pages.flatMap((page) => page.results)!;

	return { pokemons, ...rest };
}
