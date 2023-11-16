import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={classes.navbar}>
      <Link to="/">
        <img
          className={classes.pokeball}
          src="/pokeball.png"
          alt="Pokeball logo"
        />
      </Link>
    </nav>
  );
}
