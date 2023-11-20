import { Link, useParams } from "react-router-dom";

import { usePokemonDetails } from "../../queries/usePokemonDetails";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { PokemonDetails } from "../../components/PokemonDetails/PokemonDetails";
import { ReturnIcon } from "../../components/Icons/ReturnIcon";
import { ArrowBackIcon } from "../../components/Icons/ArrowBackIcon";
import { ArrowForwardIcon } from "../../components/Icons/ArrowForwardIcon";

import classes from "./pokemon-details-page.module.css";

export function PokemonDetailsPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data, isLoading } = usePokemonDetails(id);

  const currentId = parseInt(id);

  return (
    <>
      {!isLoading && data && (
        <>
          <Link to="/pokemon">
            <button className={classes.backToPokemonButton}>
              <ReturnIcon className={classes.arrowIcon} />
              Back to Pokémon
            </button>
          </Link>
          <div className={classes.buttonContainer}>
            {currentId !== 1 && (
              <Link to={`/pokemon/${currentId - 1}`}>
                <button className={classes.previousButton}>
                  <ArrowBackIcon className={classes.arrowIcon} />
                  Previous Pokémon
                </button>
              </Link>
            )}
            <Link to={`/pokemon/${currentId + 1}`}>
              <button className={classes.nextButton}>
                Next Pokémon
                <ArrowForwardIcon className={classes.arrowIcon} />
              </button>
            </Link>
          </div>
          <PokemonDetails pokemon={data} />
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
