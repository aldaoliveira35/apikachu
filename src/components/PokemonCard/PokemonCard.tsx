import { Link } from "react-router-dom";

import { getColorByType } from "../../utils/colorsByType";
import { Pokemon } from "../../queries/types";
import classes from "./PokemonCard.module.css";
import { BrokenImageIcon } from "../Icons/BrokenImageIcon";

interface PokemonCardProps {
  pokemon: Pokemon;
  showOldSchoolImage: boolean;
}

export function PokemonCard(props: PokemonCardProps) {
  const pokemonImage = props.showOldSchoolImage
    ? props.pokemon.oldSchoolImage
    : props.pokemon.image;
  return (
    <Link to={`/pokemon/${props.pokemon.id}`}>
      <div className={classes.pokemonCard}>
        <div className={classes.pokemonImageWrapper}>
          {pokemonImage ? (
            <img
              src={pokemonImage}
              alt={props.pokemon.name}
              className={classes.pokemonImage}
            />
          ) : (
            <BrokenImageIcon className={classes.brokenImageIcon} />
          )}
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
