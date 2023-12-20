import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../api-clients/pokemon-api-client-vercel";
import type { PokemonDetailsResponse } from "../types/types-vercel";

export function usePokemonDetails(id: string) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: async ({ signal }) => {
      const pokemonDetails: PokemonDetailsResponse = await getPokemonDetails(
        signal,
        id
      );

      return pokemonDetails;
    },
    staleTime: Infinity,
  });
}
