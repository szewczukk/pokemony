import { z } from 'zod';

export async function getPokemon(url: string) {
	const response = await fetch(url);
	const result = await response.json();

	const pokemon = schema.parse(result);
	return pokemon;
}

const schema = z.object({
	sprites: z.object({
		front_default: z.string(),
	}),
	name: z.string(),
	height: z.number(),
	weight: z.number(),
});
