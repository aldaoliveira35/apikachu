import { Item } from "../../queries/types";
import { BrokenImageIcon } from "../Icons/BrokenImageIcon";

import classes from "./ItemCard.module.css";

interface ItemCardProps {
  item: Item;
}

export function ItemCard(props: ItemCardProps) {
  return (
    <div className={classes.itemCard}>
      <div className={classes.itemImageWrapper}>
        {props.item.image ? (
          <img
            src={props.item.image}
            alt={props.item.name}
            className={classes.itemImage}
          />
        ) : (
          <BrokenImageIcon className={classes.brokenImageIcon} />
        )}
      </div>
      <div className={classes.itemInfo}>
        <p className={classes.boldText}>
          #{props.item.id.toString().padStart(4, "0")}
        </p>
        <p className={classes.boldText}>{props.item.name}</p>
        <p>
          <span className={classes.boldText}>Cost: </span>
          {props.item.cost}
        </p>
        <p>
          <span className={classes.boldText}>Category: </span>{" "}
          <span className={classes.capitalizeText}>{props.item.category}</span>
        </p>
        <p>
          <span className={classes.boldText}>Effect: </span>
          {props.item.effect}
        </p>
      </div>
    </div>
  );
}
