import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "../Icons/ArrowForwardIcon";
import classes from "./EvolutionChain.module.css";

interface EvolutionChainProps {
  evolutionChain: Array<{
    id: number;
    name: string;
    image: string;
  }>;
}

export function EvolutionChain(props: EvolutionChainProps) {
  return (
    <div className={classes.mainWrapper}>
      <p className={classes.title}>Evolutions</p>
      <div className={classes.evolutionChain}>
        {props.evolutionChain.map((pokemon, index) => (
          <>
            <div className={classes.pokemonWrapper}>
              <div className={classes.pokemonImageWrapper}>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <img src={pokemon.image} />
                </Link>
              </div>
              <span className={classes.textDisplay}>
                #{pokemon.id.toString().padStart(4, "0")}
              </span>
              <span className={classes.textDisplay}>{pokemon.name}</span>
            </div>

            {props.evolutionChain.length - 1 !== index && (
              <ArrowForwardIcon className={classes.arrowIcon} />
            )}
          </>
        ))}
        {props.evolutionChain.length < 1 && (
          <p className={classes.noEvolutionsDisplay}>
            There seem to be no evolutions available.
          </p>
        )}
      </div>
    </div>
  );
}
