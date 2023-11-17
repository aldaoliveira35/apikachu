import { useInfiniteQuery } from "@tanstack/react-query";

import { getPokemons } from "../api-clients/pokemon-api-client";
import { Pokemon, PokemonDetailsResponse, PokemonsListResponse } from "./types";

export function usePokemons() {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: async ({ signal, pageParam }) => {
      const pageSize = 20;

      const { results }: PokemonsListResponse = await getPokemons(
        signal,
        pageSize,
        pageSize * pageParam
      );

      const pokemonsDetails: PokemonDetailsResponse[] = await Promise.all(
        results.map((pokemon) => {
          return fetch(pokemon.url, { signal }).then((response) =>
            response.json()
          );
        })
      );

      return pokemonsDetails.map<Pokemon>((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map(({ type }) => type.name),
        abilities: pokemon.abilities.map(({ ability }) => ability.name),
        stats: pokemon.stats.map(({ stat, base_stat }) => ({
          name: stat.name,
          value: base_stat,
        })),
      }));
    },
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) => pages.length,
  });
}
