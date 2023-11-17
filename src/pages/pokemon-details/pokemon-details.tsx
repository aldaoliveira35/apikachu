import { Link, useParams } from "react-router-dom";

import { usePokemonDetails } from "../../queries/usePokemonDetails";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonDetails } from "../../components/PokemonDetails/PokemonDetails";

import classes from "./pokemon-details.module.css";

export function PokemonDetailsPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data, isLoading } = usePokemonDetails(id);

  const currentId = parseInt(id);

  return (
    <>
      {!isLoading && data && (
        <>
          <PokemonDetails pokemon={data} />
          {currentId !== 1 && (
            <Link to={`/pokemons/${currentId - 1}`}>
              <button>Previous Pokémon</button>
            </Link>
          )}
          <Link to={`/pokemons/${currentId + 1}`}>
            <button>Next Pokémon</button>
          </Link>
          <Link to="/pokemons">
            <button>Back to Pokémons list</button>
          </Link>
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
