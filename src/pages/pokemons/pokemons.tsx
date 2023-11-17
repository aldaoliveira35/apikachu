import classes from "./pokemons.module.css";

import { usePokemons } from "../../queries/usePokemons";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";

export function PokemonsPage() {
  const { data, isLoading, fetchNextPage } = usePokemons();

  return (
    <>
      {!isLoading && data && data.pages.length > 0 && (
        <>
          <div className={classes.pokedexGrid}>
            {data.pages.flat().map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
          <button
            className={classes.fetchMoreButton}
            onClick={() => fetchNextPage()}
          >
            Fetch more Pokémon
          </button>
        </>
      )}

      {isLoading && (
        <div className={classes.loadingIconWrapper}>
          <LoadingIcon />
          Loading Pokémon...
        </div>
      )}
    </>
  );
}
