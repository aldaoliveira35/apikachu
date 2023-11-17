import { getColorByType } from "../../utils/colorsByType";
import { Pokemon } from "../../queries/types";
import classes from "./PokemonDetails.module.css";

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

export function PokemonDetails(props: PokemonDetailsProps) {
  return (
    <div className={classes.pokemonCard}>
      <div className={classes.pokemonImageWrapper}>
        <img src={props.pokemon.image} alt={props.pokemon.name} />
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
  );
}
