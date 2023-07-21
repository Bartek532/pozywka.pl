import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";

import { Badge } from "components/common/badge/Badge";

import styles from "./Hero.module.scss";

type HeroProps = {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly newsletterLabel: string;
};

export const Hero = memo<HeroProps>(({ title, description, image, newsletterLabel }) => (
  <div className={styles.hero}>
    <div className={styles.wrapper}>
      <div className={clsx(styles.column, styles.first)}>
        <h1 className={styles.title}>Współpraca</h1>
        <Badge text="Cześć" variant="black" direction="left" />
        <h2 className={styles.subtitle} dangerouslySetInnerHTML={{ __html: title }}></h2>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
    <div className={clsx(styles.column, styles.second)}>
      <div className={styles.image}>
        <Image src={image} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.label}>
        <p dangerouslySetInnerHTML={{ __html: newsletterLabel }}></p>
        <a href="mailto:kontakt@pozywka.pl" className={styles.link}>
          napisz do mnie
        </a>
      </div>
    </div>
  </div>
));

Hero.displayName = "Hero";
