import { Fragment } from "react";
import { BaseStatBar } from "./BaseStatBar";
import type { PokemonResponse } from "../../types/types-vercel";
import { getColorByType } from "../../utils/colorsByType";

import classes from "./PokemonDetails.module.css";

interface PokemonDetailsProps {
  pokemon: PokemonResponse;
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <>
      <div className={classes.detailsContainer}>
        <div className={classes.pokemonCard}>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className={classes.infoDisplay}>
          <div className={classes.pokemonName}>
            #{pokemon.id.toString().padStart(4, "0")} {pokemon.name}
          </div>
          <p className={classes.description}>{pokemon.description}</p>
          <p className={classes.name}>Height: {pokemon.height}m</p>
          <p className={classes.name}>Weight: {pokemon.weight}kg</p>
          <p className={classes.name}>
            Abilities: {pokemon.abilities.join(" | ")}
          </p>
          <div className={classes.pokemonTypes}>
            Type:
            {pokemon.types.map((type) => (
              <p
                key={type}
                className={classes.pokemonType}
                style={{ backgroundColor: getColorByType(type) }}
              >
                {type}
              </p>
            ))}
          </div>
          {pokemon.stats.map((stat, statIndex) => (
            <Fragment key={stat.name}>
              <p className={classes.styledStat}>
                {stat.name} : {stat.value}
              </p>
              <BaseStatBar
                value={stat.value}
                color={
                  pokemon.types.length === 1
                    ? getColorByType(pokemon.types[0])
                    : statIndex % 2 === 0
                    ? getColorByType(pokemon.types[0])
                    : getColorByType(pokemon.types[1])
                }
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
