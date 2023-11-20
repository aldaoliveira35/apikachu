import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../api-clients/pokemon-api-client";
import { Pokemon, PokemonDetailsResponse } from "./types";

export function usePokemonDetails(id: string) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: async ({ signal }) => {
      const pokemonDetails: PokemonDetailsResponse = await getPokemonDetails(
        signal,
        id
      );

      return {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
        image:
          pokemonDetails.sprites.other["official-artwork"].front_default ||
          pokemonDetails.sprites.front_default,
        types: pokemonDetails.types.map(({ type }) => type.name),
        abilities: pokemonDetails.abilities.map(({ ability }) => ability.name),
        stats: pokemonDetails.stats.map(({ stat, base_stat }) => ({
          name: stat.name,
          value: base_stat,
        })),
      } as Pokemon;
    },
  });
}
