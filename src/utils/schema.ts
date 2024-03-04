import { z } from 'zod';

export const pokemonSchema = z.object({
	sprites: z.object({
		front_default: z.string(),
	}),
	name: z.string(),
	height: z.number(),
	weight: z.number(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;
