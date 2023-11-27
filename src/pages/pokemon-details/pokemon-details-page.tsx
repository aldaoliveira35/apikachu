import { Link, useParams } from "react-router-dom";

import { usePokemonDetails } from "../../queries/usePokemonDetails";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonDetails } from "../../components/PokemonDetails/PokemonDetails";
import { ArrowBackIcon } from "../../components/Icons/ArrowBackIcon";
import { ArrowForwardIcon } from "../../components/Icons/ArrowForwardIcon";
import { EvolutionChain } from "../../components/PokemonDetails/EvolutionChain";

import classes from "./pokemon-details-page.module.css";
import { usePokemonEvolutions } from "../../queries/usePokemonEvolutions";

export function PokemonDetailsPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: pokemonDetails, isLoading } = usePokemonDetails(id);
  const { data: pokemonEvolutionChain = [] } = usePokemonEvolutions(id);

  const currentPokemon = parseInt(id);
  const previousPokemon = currentPokemon - 1;
  const nextPokemon = currentPokemon + 1;

  return (
    <>
      {!isLoading && pokemonDetails && (
        <div className={classes.detailsWrapper}>
          {currentPokemon !== 1 && (
            <Link
              to={`/pokemon/${previousPokemon}`}
              className={classes.previousLink}
            >
              <ArrowBackIcon className={classes.arrowIcon} />#
              {previousPokemon.toString().padStart(4, "0")}
            </Link>
          )}
          <div>
            <PokemonDetails pokemon={pokemonDetails} />
            <EvolutionChain evolutionChain={pokemonEvolutionChain} />
          </div>
          <Link to={`/pokemon/${nextPokemon}`} className={classes.nextLink}>
            #{nextPokemon.toString().padStart(4, "0")}
            <ArrowForwardIcon className={classes.arrowIcon} />
          </Link>
        </div>
      )}

      {isLoading && (
        <div className={classes.loadingIconWrapper}>
          <LoadingIcon />
          <p className={classes.loadingParagraph}>Loading Pokémon...</p>
        </div>
      )}
    </>
  );
}
