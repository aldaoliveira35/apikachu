import { useQuery } from "@tanstack/react-query";

import { getPokemons } from "../api-clients/pokemon-api-client";

interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export function usePokemon() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: async ({ signal }) => {
      const { results }: PokemonsResponse = await getPokemons(signal);

      const pokemonsDetails: Pokemon[] = await Promise.all(
        results.map((pokemon) => {
          return fetch(pokemon.url).then((response) => response.json());
        })
      );

      return pokemonsDetails;
    },
  });
}
