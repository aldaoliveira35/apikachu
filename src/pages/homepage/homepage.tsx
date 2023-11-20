import { Link } from "react-router-dom";
import classes from "./homepage.module.css";

export function HomePage() {
  return (
    <div className={classes.homePageParent}>
      <div className={classes.homePage}>
        <span className={classes.info}>This is your go-to Pokémon wiki.</span>
        <span className={classes.info}>
          Everything you want to know about pokémon is here!
        </span>
        <Link to="/pokemon" className={classes.homePageButton}>
          <img
            src="/homepage-fetch-em-all.png"
            alt="Go Fetch'Em All Link"
          ></img>
        </Link>
      </div>
    </div>
  );
}
