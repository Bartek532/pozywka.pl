import styles from "./EmptyResults.module.scss";
import { useEffect } from "react";
import clsx from "clsx";

export const EmptyResults = () => {
  useEffect(() => {
    const audio = new Audio(`/sounds/coffee.mp3`);
    //if (localStorage.getItem("sounds") === "enabled") {
    audio.play();
    //}
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