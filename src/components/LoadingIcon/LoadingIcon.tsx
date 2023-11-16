import classes from "./LoadingIcon.module.css";

export function LoadingIcon() {
  return (
    <div className={classes.pokeball}>
      <div className={classes.upperHalf}></div>
      <div className={classes.bottomHalf}></div>
      <div className={classes.blackStripe}></div>
      <div className={classes.bigButton}></div>
      <div className={classes.smallButton}></div>
    </div>
  );
}
