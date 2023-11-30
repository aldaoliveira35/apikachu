import { Link } from "react-router-dom";
import classes from "./homepage.module.css";

export function HomePage() {
  return (
    <div className={classes.homePageParent}>
      <div className={classes.homePage}>
        <span className={classes.info}>New to the Pokémon world?</span>
        <span className={classes.info}>Your beginner guide is right here!</span>
        <Link to="/pokemon" className={classes.homePageLink}>
          <img
            src="/homepage-fetch-em-all.png"
            alt="Go Fetch'Em All Link"
          ></img>
        </Link>
      </div>
    </div>
  );
}
