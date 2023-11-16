import { useInfiniteQuery } from "@tanstack/react-query";

import { getPokemons } from "../api-clients/pokemon-api-client";

interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export function usePokemon() {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: async ({ signal, pageParam }) => {
      const pageSize = 30;

      const { results }: PokemonsResponse = await getPokemons(
        signal,
        pageSize,
        pageSize * pageParam
      );

      const pokemonsDetails: Pokemon[] = await Promise.all(
        results.map((pokemon) => {
          return fetch(pokemon.url, { signal }).then((response) =>
            response.json()
          );
        })
      );

      return pokemonsDetails;
    },
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) => pages.length,
  });
}
