import styles from "./Badge.module.scss";
import { memo } from "react";
import clsx from "clsx";

type BadgeProps = {
  readonly variant: "red" | "green" | "violet";
  readonly text: string;
  readonly direction: "left" | "right";
};

export const Badge = memo<BadgeProps>(({ variant, text, direction }) => {
  return <div className={clsx(styles.badge, styles[variant], styles[direction])}>{text}</div>;
});

Badge.displayName = "Badge";
