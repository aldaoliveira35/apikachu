import { useInfiniteQuery } from "@tanstack/react-query";

import { getPokemon } from "../api-clients/pokemon-api-client-vercel";
import type { PokemonListResponse } from "../types/types-vercel";

const PAGE_SIZE = 30;

export function usePokemon(search: string, type: string) {
  return useInfiniteQuery({
    queryKey: ["pokemon", search, type],
    queryFn: async ({ signal, pageParam }) => {
      const pokemon: PokemonListResponse = await getPokemon(
        signal,
        type,
        search,
        pageParam,
        PAGE_SIZE
      );

      return pokemon;
    },
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) return;

      return pages.length;
    },
  });
}
