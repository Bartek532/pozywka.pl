import Image from "next/image";
import styles from "./Collaboration.module.scss";
import type { Page, ThingIDo } from "types";
import { Badge } from "components/common/badge/Badge";
import clsx from "clsx";
import { Banner } from "components/common/banner/Banner";

export const CollaborationView = ({ page, thingsIDo }: { page: Page; thingsIDo: ThingIDo[] }) => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.column, styles.first)}>
            <h1 className={styles.title}>Współpraca</h1>
            <Badge text="Cześć" variant="black" direction="left" />
            <h2 className={styles.subtitle} dangerouslySetInnerHTML={{ __html: page.acf.personal_info_title }}></h2>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: page.acf.personal_info }}></div>
          </div>
        </div>
        <div className={clsx(styles.column, styles.second)}>
          <div className={styles.image}>
            <Image src={page.acf.image} alt="" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.label}>
            <p dangerouslySetInnerHTML={{ __html: page.acf.newsletter_label }}></p>
            <a href="mailto:kontakt@pozywka.pl" className={styles.link}>
              napisz do mnie
            </a>
          </div>
        </div>
      </div>
      <div className={clsx(styles.container, styles.big)}>
        <div className={styles.things}>
          <h2 className={styles.title}>Co robię?</h2>
          <div className={styles.wrapper}>
            {thingsIDo.map((thing) => {
              return (
                <div className={styles.thing} key={thing.title}>
                  <div className={styles.image}>
                    <Image src={thing.image} alt="" layout="fill" objectFit="cover" />
                  </div>
                  <p className={styles.description}>
                    <strong className={styles.subtitle}>{thing.title} </strong>
                    <span dangerouslySetInnerHTML={{ __html: thing.description }}></span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Banner
        label="Więcej"
        title={page.acf.collaboration_banner_text}
        imageSrc={page.acf.collaboration_banner_image}
        link={{ url: "mailto:kontakt@pozywka.pl", title: "napisz do mnie" }}
        variant="green"
      />
      <div className={clsx(styles.container, styles.texts)}>
        <div className="content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
      </div>
    </>
  );
};
