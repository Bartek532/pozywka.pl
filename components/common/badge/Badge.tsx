import { memo } from "react";
import clsx from "clsx";

import styles from "./Badge.module.scss";

type BadgeProps = {
  readonly variant: "red" | "green" | "violet" | "black";
  readonly text: string;
  readonly direction: "left" | "right";
};

export const Badge = memo<BadgeProps>(({ variant, text, direction }) => {
  return <div className={clsx(styles.badge, styles[variant], styles[direction])}>{text}</div>;
});

Badge.displayName = "Badge";
