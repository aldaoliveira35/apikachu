import { getColorByType } from "../../utils/colorsByType";
import classes from "./PokemonCard.module.css";

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
  number: number;
}

export function PokemonCard(props: PokemonCardProps) {
  return (
    <div className={classes.pokemonCard}>
      <div className={classes.pokemonImageWrapper}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={classes.pokemonName}>
        <span>#{props.number.toString().padStart(4, "0")}</span>
        <span>{props.name}</span>
      </div>
      <div className={classes.pokemonTypes}>
        {props.types.map((type) => (
          <div
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
