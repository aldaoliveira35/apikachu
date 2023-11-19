import { Link } from "react-router-dom";
import classes from "./homepage.module.css";

export function HomePage() {
  return (
    <div className={classes.homePageParent}>
      <div className={classes.homePage}>
        <span className={classes.info}>This is your go-to Pokemon wiki.</span>
        <span className={classes.info}>
          Everything you want to know about pokemon is here!
        </span>
        <Link  to="/pokemon" className={classes.homePageButton} >
          <img src="/HomePageA.png" alt="Go Fetch'Em All Link"></img>
        </Link>
      </div>
    </div>
  );
}
