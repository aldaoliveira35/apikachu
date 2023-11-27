import { BaseStatBar } from "./BaseStatBar";
import { Pokemon } from "../../queries/types";
import { getColorByType } from "../../utils/colorsByType";

import classes from "./PokemonDetails.module.css";

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

export function PokemonDetails(props: PokemonDetailsProps) {
  return (
    <>
      <div className={classes.detailsContainer}>
        <div className={classes.pokemonCard}>
          <img src={props.pokemon.image} alt={props.pokemon.name} />
        </div>

        <div className={classes.infoDisplay}>
          <div className={classes.pokemonName}>
            #{props.pokemon.id.toString().padStart(4, "0")} {props.pokemon.name}
          </div>
          <p className={classes.name}>Height: {props.pokemon.height}m</p>
          <p className={classes.name}>Weight: {props.pokemon.weight}kg</p>
          <p className={classes.name}>
            Abilities: {props.pokemon.abilities.join(" | ")}
          </p>
          <div className={classes.pokemonTypes}>
            Type:
            {props.pokemon.types.map((type) => (
              <p
                key={type}
                className={classes.pokemonType}
                style={{ backgroundColor: getColorByType(type) }}
              >
                {type}
              </p>
            ))}
          </div>
          {props.pokemon.stats.map((stat, statIndex) => (
            <>
              <p key={stat.name} className={classes.styledStat}>
                {stat.name} : {stat.value}
              </p>
              <BaseStatBar
                value={stat.value}
                color={
                  props.pokemon.types.length === 1
                    ? getColorByType(props.pokemon.types[0])
                    : statIndex % 2 === 0
                    ? getColorByType(props.pokemon.types[0])
                    : getColorByType(props.pokemon.types[1])
                }
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
