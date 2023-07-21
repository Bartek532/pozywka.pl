import clsx from "clsx";
import { useEffect } from "react";

import { playSound } from "utils/functions";

import styles from "./EmptyResults.module.scss";

export const EmptyResults = () => {
  useEffect(() => {
    playSound("/sounds/coffee.mp3");
  }, []);

  return (
    <div className={styles.notFound}>
      <p className={styles.description}>
        Niestety, nie znaleźliśmy tego, czego szukasz. Zaparz kawę i spróbuj ponownie!
      </p>
      <div className={styles.container}>
        <div className={clsx(styles.steam, styles.steam1)}></div>
        <div className={clsx(styles.steam, styles.steam2)}></div>
        <div className={clsx(styles.steam, styles.steam3)}></div>
        <div className={clsx(styles.steam, styles.steam4)}></div>

        <div className={styles.cup}>
          <div className={styles.cupBody}>
            <div className={styles.cupShade}></div>
          </div>
          <div className={styles.cupHandle}></div>
        </div>

        <div className={styles.saucer}></div>

        <div className={styles.shadow}></div>
      </div>
    </div>
  );
};

EmptyResults.displayName = "EmptyResults";
