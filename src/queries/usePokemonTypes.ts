import { useQuery } from "@tanstack/react-query";
import { getPokemonTypes } from "../api-clients/pokemon-api-client-vercel";
import { PokemonTypesResponse } from "../types/types-vercel";

export function usePokemonTypes() {
  return useQuery({
    queryKey: ["pokemon-types"],
    queryFn: async ({ signal }) => {
      const pokemonTypes: PokemonTypesResponse = await getPokemonTypes(signal);

      return pokemonTypes.sort();
    },
    staleTime: Infinity,
  });
}
