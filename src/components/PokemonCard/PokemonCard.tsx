import { Link } from "react-router-dom";

import type { PokemonResponse } from "../../types/types-vercel";
import { getColorByType } from "../../utils/colorsByType";
import classes from "./PokemonCard.module.css";
import { BrokenImageIcon } from "../Icons/BrokenImageIcon";

interface PokemonCardProps {
  pokemon: PokemonResponse;
  showOldSchoolImage: boolean;
}

export function PokemonCard({ pokemon, showOldSchoolImage }: PokemonCardProps) {
  const pokemonImage = showOldSchoolImage
    ? pokemon.oldSchoolImage
    : pokemon.image;
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className={classes.pokemonCard}>
        <div className={classes.pokemonImageWrapper}>
          {pokemonImage ? (
            <img
              src={pokemonImage}
              alt={pokemon.name}
              className={classes.pokemonImage}
            />
          ) : (
            <BrokenImageIcon className={classes.brokenImageIcon} />
          )}
        </div>
        <div className={classes.pokemonName}>
          <span>#{pokemon.id.toString().padStart(4, "0")}</span>
          <span>{pokemon.name}</span>
        </div>
        <div className={classes.pokemonTypes}>
          {pokemon.types.map((type) => (
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
