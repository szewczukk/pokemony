import { pokemonSchema } from '@/utils/schema';

export async function getPokemon(url: string) {
	const response = await fetch(url);
	const result = await response.json();

	const pokemon = pokemonSchema.parse(result);
	return pokemon;
}
