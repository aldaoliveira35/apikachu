import { useInfiniteQuery } from "@tanstack/react-query";

import { getPokemon } from "../api-clients/pokemon-api-client";
import { Pokemon, PokemonDetailsResponse, PokemonListResponse } from "./types";

async function listPokemonWithSearch(signal: AbortSignal, search: string) {
  // The API does not support pagination with a search term.
  const pageSize = 10_000;

  const { results }: PokemonListResponse = await getPokemon(
    signal,
    pageSize,
    0
  );

  return results.filter((pokemon) => pokemon.name.startsWith(search));
}

async function listPokemon(signal: AbortSignal, pageParam: number) {
  const pageSize = 20;

  const { results }: PokemonListResponse = await getPokemon(
    signal,
    pageSize,
    pageSize * pageParam
  );

  return results;
}

export function usePokemon(search: string) {
  return useInfiniteQuery({
    queryKey: ["pokemon", search],
    queryFn: async ({ signal, pageParam }) => {
      const results =
        search.length === 0
          ? await listPokemon(signal, pageParam)
          : await listPokemonWithSearch(signal, search);

      const pokemonDetails: PokemonDetailsResponse[] = await Promise.all(
        results.map((pokemon) => {
          return fetch(pokemon.url, { signal }).then((response) =>
            response.json()
          );
        })
      );

      return pokemonDetails.map<Pokemon>((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        image:
          pokemon.sprites.other["official-artwork"].front_default ||
          pokemon.sprites.front_default,
        oldSchoolImage: pokemon.sprites.front_default,
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
