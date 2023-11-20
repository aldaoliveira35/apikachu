import { Link } from "react-router-dom";

import { getColorByType } from "../../utils/colorsByType";
import { Pokemon } from "../../queries/types";
import classes from "./PokemonCard.module.css";

interface PokemonCardProps {
  pokemon: Pokemon;
  showShinyImage: boolean;
}

export function PokemonCard(props: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${props.pokemon.id}`}>
      <div className={classes.pokemonCard}>
        <div className={classes.pokemonImageWrapper}>
          <img
            src={
              props.showShinyImage
                ? props.pokemon.shinyImage
                : props.pokemon.image
            }
            alt={props.pokemon.name}
            className={classes.pokemonImage}
          />
        </div>
        <div className={classes.pokemonName}>
          <span>#{props.pokemon.id.toString().padStart(4, "0")}</span>
          <span>{props.pokemon.name}</span>
        </div>
        <div className={classes.pokemonTypes}>
          {props.pokemon.types.map((type) => (
            <div
              key={type}
              className={classes.pokemonType}
              style={{ backgroundColor: getColorByType(type) }}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
