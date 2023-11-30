import classes from "./BaseStatBar.module.css";

const BASE_STAT_MAX_VALUE = 255;

interface BaseStatBarProps {
  value: number;
  color: string;
}

export function BaseStatBar({ value, color }: BaseStatBarProps) {
  const percentage = Math.round((value / BASE_STAT_MAX_VALUE) * 100);

  return (
    <div className={classes.backgroundBar}>
      <div
        className={classes.animatedBar}
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
}
