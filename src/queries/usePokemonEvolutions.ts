import { useQuery } from "@tanstack/react-query";
import {
  getPokemonDetails,
  getPokemonSpecies,
} from "../api-clients/pokemon-api-client";
import type {
  PokemonDetailsResponse,
  PokemonSpeciesResponse,
  PokemonEvolutionChainResponse,
} from "../types/types";

export function usePokemonEvolutions(id: string) {
  return useQuery({
    queryKey: ["pokemon-evolutions", id],
    queryFn: async ({ signal }) => {
      // Fetch the Pokemon species to obtain the evolution chain URL.
      const pokemonSpecies: PokemonSpeciesResponse = await getPokemonSpecies(
        signal,
        id
      );

      // Fetch the name for each Pokemon present in the evolution chain.
      const pokemonEvolutionChain: PokemonEvolutionChainResponse = await fetch(
        pokemonSpecies.evolution_chain.url
      ).then((response) => response.json());

      const evolutionChain = [];
      let currentPokemon = pokemonEvolutionChain.chain;
      while (true) {
        evolutionChain.push(currentPokemon.species.name);

        // This means we don't have any more evolutions.
        if (currentPokemon.evolves_to.length === 0) {
          break;
        }

        currentPokemon = currentPokemon.evolves_to[0];
      }

      // Get the details for each Pokemon present in the evolution chain.
      const pokemonInEvolutionChainDetails: PokemonDetailsResponse[] =
        await Promise.all(
          evolutionChain.map((name) => getPokemonDetails(signal, name))
        );

      return pokemonInEvolutionChainDetails.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites.other["official-artwork"].front_default ||
          pokemon.sprites.front_default,
      }));
    },
    staleTime: Infinity,
  });
}
