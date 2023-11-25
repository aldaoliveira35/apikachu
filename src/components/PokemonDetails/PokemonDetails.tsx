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
          <div className={classes.pokemonName}>
            <span>#{props.pokemon.id.toString().padStart(4, "0")}</span>
            <span>{props.pokemon.name}</span>
          </div>
          <div className={classes.pokemonImageWrapper}>
            <img src={props.pokemon.image} alt={props.pokemon.name} />
          </div>
        </div>
        <div className={classes.infoDisplay}>
          <p className={classes.description}></p>
          <p className={classes.height}>
            <span className={classes.bold}>Height: </span>{" "}
            {props.pokemon.height} cm
          </p>
          <p className={classes.weight}>
            <span className={classes.bold}>Weight: </span>{" "}
            {props.pokemon.weight} kg
          </p>
          <p className={classes.ability}>
            <span className={classes.bold}>Abilities:</span>{" "}
            {props.pokemon.abilities.join(" | ")}
          </p>
          <div className={classes.pokemonTypes}>
            <span className={classes.bold}>Type:</span>
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
          <div className={classes.pokemonStats}>
            {props.pokemon.stats.map((stat) => (
              <p key={stat.name}>
                <span className={classes.bold}>{stat.name}:</span>
                {stat.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
