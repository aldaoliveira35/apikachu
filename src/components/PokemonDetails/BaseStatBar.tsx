import classes from "./BaseStatBar.module.css";

const BASE_STAT_MAX_VALUE = 255;

interface BaseStatBarProps {
  value: number;
  color: string;
}

export function BaseStatBar(props: BaseStatBarProps) {
  const percentage = Math.round((props.value / BASE_STAT_MAX_VALUE) * 100);

  return (
    <div className={classes.parent}>
      <div
        className={classes.child}
        style={{ width: `${percentage}%`, backgroundColor: props.color }}
      />
    </div>
  );
}
