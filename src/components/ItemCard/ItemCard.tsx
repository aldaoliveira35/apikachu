import type { ItemsResponse } from "../../types/types-vercel";
import { BrokenImageIcon } from "../Icons/BrokenImageIcon";

import classes from "./ItemCard.module.css";

interface ItemCardProps {
  item: ItemsResponse;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className={classes.itemCard}>
      <div className={classes.itemImageWrapper}>
        {item.image ? (
          <img src={item.image} alt={item.name} className={classes.itemImage} />
        ) : (
          <BrokenImageIcon className={classes.brokenImageIcon} />
        )}
      </div>
      <div className={classes.itemInfo}>
        <p className={classes.boldText}>
          #{item.id.toString().padStart(4, "0")}
        </p>
        <p className={classes.boldText}>{item.name}</p>
        <p>
          <span className={classes.boldText}>Cost: </span>
          {item.cost}
        </p>
        <p>
          <span className={classes.boldText}>Category: </span>{" "}
          <span className={classes.capitalizeText}>{item.category}</span>
        </p>
        <p>
          <span className={classes.boldText}>Effect: </span>
          {item.effect}
        </p>
      </div>
    </div>
  );
}
