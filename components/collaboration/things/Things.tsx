import Image from "next/image";
import { memo } from "react";

import { Thing } from "../utils/validation/types";

import styles from "./Things.module.scss";

type ThingsProps = {
  readonly things: Thing[];
};

export const Things = memo<ThingsProps>(({ things }) => (
  <div className={styles.things}>
    <h2 className={styles.title}>Co robię?</h2>
    <div className={styles.wrapper}>
      {things.map((thing) => (
        <div className={styles.thing} key={thing.title}>
          <div className={styles.image}>
            <Image src={thing.image} alt="" fill style={{ objectFit: "cover" }} />
          </div>
          <p className={styles.description}>
            <strong className={styles.subtitle}>{thing.title} </strong>
            <span dangerouslySetInnerHTML={{ __html: thing.description }}></span>
          </p>
        </div>
      ))}
    </div>
  </div>
));

Things.displayName = "Things";
