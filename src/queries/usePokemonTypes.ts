import { useQuery } from "@tanstack/react-query";
import { getPokemonTypes } from "../api-clients/pokemon-api-client";
import { PokemonTypesResponse } from "../types/types";

export function usePokemonTypes() {
  return useQuery({
    queryKey: ["pokemon-types"],
    queryFn: async ({ signal }) => {
      const pokemonTypes: PokemonTypesResponse = await getPokemonTypes(signal);

      return pokemonTypes.results.map((type) => type.name).sort();
    },
    staleTime: Infinity,
  });
}
