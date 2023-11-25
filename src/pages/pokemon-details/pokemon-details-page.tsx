import { Link, useParams } from "react-router-dom";

import { usePokemonDetails } from "../../queries/usePokemonDetails";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonDetails } from "../../components/PokemonDetails/PokemonDetails";
import { ReturnIcon } from "../../components/Icons/ReturnIcon";
import { ArrowBackIcon } from "../../components/Icons/ArrowBackIcon";
import { ArrowForwardIcon } from "../../components/Icons/ArrowForwardIcon";
import { EvolutionChain } from "../../components/PokemonDetails/EvolutionChain";

import classes from "./pokemon-details-page.module.css";
import { usePokemonEvolutions } from "../../queries/usePokemonEvolutions";

export function PokemonDetailsPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: pokemonDetails, isLoading } = usePokemonDetails(id);
  const { data: pokemonEvolutionChain = [] } = usePokemonEvolutions(id);

  const currentId = parseInt(id);

  console.log(pokemonEvolutionChain);

  return (
    <>
      {!isLoading && pokemonDetails && (
        <>
          <Link to="/pokemon" className={classes.backToPokemonLink}>
            <ReturnIcon className={classes.arrowIcon} />
            Back to Pokémon
          </Link>
          <div className={classes.linkContainer}>
            {currentId !== 1 && (
              <Link
                to={`/pokemon/${currentId - 1}`}
                className={classes.previousLink}
              >
                <ArrowBackIcon className={classes.arrowIcon} />
                Previous Pokémon
              </Link>
            )}
            <Link to={`/pokemon/${currentId + 1}`} className={classes.nextLink}>
              Next Pokémon
              <ArrowForwardIcon className={classes.arrowIcon} />
            </Link>
          </div>
          <div className={classes.detailsWrapper}>
            <PokemonDetails pokemon={pokemonDetails} />
            <EvolutionChain evolutionChain={pokemonEvolutionChain} />
          </div>
        </>
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
