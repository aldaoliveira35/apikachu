import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import classes from "./Navbar.module.css";

export function Navbar() {
  const [isHidden, setIsHidden] = useState(true);
  const location = useLocation();

  return (
    <>
      <nav className={classes.navbar}>
        <img
          className={classes.pokeball}
          src={isHidden ? "/ClosePokeball.png" : "/OpenPokeball.png"}
          alt="ClosePokeball logo"
          width="45"
          height="45"
          onClick={() => setIsHidden(!isHidden)}
        />
        {!isHidden && (
          <>
            <Link
              to="/"
              className={
                location.pathname !== "/"
                  ? classes.navLink
                  : `${classes.navLink} ${classes.navLinkActive}`
              }
            >
              HomePage
            </Link>
            <Link
              to="/pokemon"
              className={
                location.pathname !== "/pokemon"
                  ? classes.navLink
                  : `${classes.navLink} ${classes.navLinkActive}`
              }
            >
              Pokemon
            </Link>
            <Link
              to="/items"
              className={
                location.pathname !== "/items"
                  ? classes.navLink
                  : `${classes.navLink} ${classes.navLinkActive}`
              }
            >
              Items
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
