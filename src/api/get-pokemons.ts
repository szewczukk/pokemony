import { z } from 'zod';

export async function getPokemons({ pageParam }: { pageParam: string }) {
	const response = await fetch(pageParam);
	const result = await response.json();

	const pokemons = schema.parse(result);
	return pokemons;
}

const schema = z.object({
	count: z.number(),
	next: z.string(),
	previous: z.string().nullable(),
	results: z.array(z.object({ name: z.string(), url: z.string() })),
});
