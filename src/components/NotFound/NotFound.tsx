import { Link } from "react-router-dom";
import classes from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={classes.notFoundWrapper}>
      <p className={classes.paragraph}>
        Oops! The page you're looking for is blocked!
      </p>
      <img src="/404.png" alt="Sleeping Snorlax" />
      <Link to="/pokemon" className={classes.returnLink}>
        Back to Pokémon
      </Link>
    </div>
  );
}
