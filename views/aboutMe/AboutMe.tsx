import clsx from "clsx";
import Image from "next/image";

import styles from "./AboutMe.module.scss";

import type { Page } from "types";

export const AboutMeView = ({ page }: { page: Page }) => (
  <>
    <div className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={clsx(styles.column, styles.first)}>
          <h1 className={styles.title}>O mnie</h1>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></div>
        </div>
      </div>
      <div className={clsx(styles.column, styles.second)}>
        <div className={styles.image}>
          <Image width="370" height="350" src={page.acf.profile_image} alt="" />
        </div>
      </div>
    </div>
    <div className={styles.banner}>
      <Image src={page.acf.image} alt="" layout="fill" objectFit="cover" />
    </div>
    <div className={styles.infos}>
      <div className={clsx(styles.info, styles.first)}>
        <div className={styles.image}>
          <Image src={page.acf.first_paragraph.image} alt="" layout="fill" objectFit="cover" />
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: page.acf.first_paragraph.text }}
        ></div>
      </div>
      <div className={clsx(styles.info, styles.second)}>
        <div className={styles.image}>
          <Image src={page.acf.second_paragraph.image} alt="" layout="fill" objectFit="cover" />
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: page.acf.second_paragraph.text }}
        ></div>
      </div>
      <div className={clsx(styles.info, styles.third)}>
        <div className={styles.image}>
          <Image src={page.acf.third_paragraph.image} alt="" layout="fill" objectFit="cover" />
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: page.acf.third_paragraph.text }}
        ></div>
      </div>
    </div>
  </>
);
