import { NewsletterForm } from "components/form/newsletterForm/NewsletterForm";
import { Badge } from "components/common/badge/Badge";
import CakesIcon from "public/svg/cakes.svg";
import SmallCakesIcon from "public/svg/cakesSmall.svg";

import styles from "./NewsletterSection.module.scss";

export const NewsletterSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Badge text="e-book" variant="violet" direction="left" />
        <h3 className={styles.title}>
          Który wybawi Cię z opresji –<br /> 5 ciast na każdą okazję
        </h3>

        <div className={styles.newsletter}>
          <span className={styles.label}>DOŁĄCZ DO NEWSLETTERA I OTRZYMAJ E-BOOKA</span>
          <NewsletterForm isSplitted />
        </div>
      </div>
      <CakesIcon className={styles.cakes} />
      <SmallCakesIcon className={styles.smallCakes} />
    </section>
  );
};

NewsletterSection.displayName = "NewsletterSection";
