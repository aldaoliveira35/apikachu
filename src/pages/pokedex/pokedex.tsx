import classes from "./pokedex.module.css";

import { usePokemons } from "../../queries/usePokemons";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";

export function Pokedex() {
  const { data, isLoading, fetchNextPage } = usePokemons();

  return (
    <>
      {!isLoading && data && data.pages.length > 0 && (
        <>
          <div className={classes.pokedexGrid}>
            {data.pages.flat().map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.sprites.other["official-artwork"].front_default}
                types={pokemon.types.map(({ type }) => type.name)}
                number={pokemon.id}
              />
            ))}
          </div>
          <button
            onClick={() => fetchNextPage()}
            style={{ backgroundColor: "red", width: "fit-content" }}
          >
            Fetch more Pokemon
          </button>
        </>
      )}

      {isLoading && (
        <div className={classes.loadingIconWrapper}>
          <LoadingIcon />
          Loading Pokemon...
        </div>
      )}
    </>
  );
}
