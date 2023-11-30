import { useQuery } from "@tanstack/react-query";
import {
  getPokemonDetails,
  getPokemonSpecies,
} from "../api-clients/pokemon-api-client";
import type {
  Pokemon,
  PokemonDetailsResponse,
  PokemonSpeciesResponse,
} from "../types/types";

export function usePokemonDetails(id: string) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: async ({ signal }) => {
      const pokemonDetails: PokemonDetailsResponse = await getPokemonDetails(
        signal,
        id
      );

      const pokemonSpecies: PokemonSpeciesResponse = await getPokemonSpecies(
        signal,
        id
      );

      // Replaces weird characters that the API returns.
      let pokemonDescription =
        pokemonSpecies.flavor_text_entries
          .find(({ language }) => language.name === "en")
          ?.flavor_text.replaceAll(/[\f\n]/g, " ") || "";

      return {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        description: pokemonDescription,
        // The height comes in decimeters and we want to show meters.
        height: pokemonDetails.height / 10,
        // The weight comes in hectograms and we want to show kilograms.
        weight: pokemonDetails.weight / 10,
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
    staleTime: Infinity,
  });
}
