import { useInfiniteQuery } from "@tanstack/react-query";

import {
  getPokemon,
  getPokemonTypeDetails,
} from "../api-clients/pokemon-api-client";
import {
  Pokemon,
  PokemonListResponse,
  PokemonDetailsResponse,
  PokemonTypeDetailsResponse,
} from "./types";

const PAGE_SIZE = 20;

async function listPokemon(
  signal: AbortSignal,
  pageParam: number,
  search: string,
  type: string
) {
  const sanitisedSearch = search.toLowerCase();

  let listPokemonUrls: string[] = [];

  if (!type) {
    // Get all the Pokemon and filter by name.
    const { results }: PokemonListResponse = await getPokemon(signal);

    listPokemonUrls = results
      .filter(({ name }) => name.toLowerCase().includes(sanitisedSearch))
      .slice(PAGE_SIZE * pageParam, PAGE_SIZE * pageParam + PAGE_SIZE)
      .map(({ url }) => url);
  } else {
    // Get all the Pokemon of a certain type and filter by name.
    const { pokemon }: PokemonTypeDetailsResponse = await getPokemonTypeDetails(
      signal,
      type
    );

    listPokemonUrls = pokemon
      .filter(({ pokemon }) =>
        pokemon.name.toLowerCase().includes(sanitisedSearch)
      )
      .slice(PAGE_SIZE * pageParam, PAGE_SIZE * pageParam + PAGE_SIZE)
      .map(({ pokemon }) => pokemon.url);
  }

  return listPokemonUrls;
}

export function usePokemon(search: string, type: string) {
  return useInfiniteQuery({
    queryKey: ["pokemon", search, type],
    queryFn: async ({ signal, pageParam }) => {
      const pokemonUrls = await listPokemon(signal, pageParam, search, type);

      const pokemonDetails: PokemonDetailsResponse[] = await Promise.all(
        pokemonUrls.map((url) =>
          fetch(url, { signal }).then((response) => response.json())
        )
      );

      return pokemonDetails.map<Pokemon>((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        description: "",
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
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) return;

      return pages.length;
    },
  });
}
