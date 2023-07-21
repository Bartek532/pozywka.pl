import { Badge } from "components/common/badge/Badge";
import CakesIcon from "public/svg/cakes.svg";
import SmallCakesIcon from "public/svg/cakesSmall.svg";

import { NewsletterForm } from "./form/NewsletterForm";
import styles from "./Newsletter.module.scss";

export const Newsletter = () => (
  <section className={styles.section}>
    <div className={styles.content}>
      <Badge text="e-book" variant="violet" direction="left" />
      <h3 className={styles.title}>
        Który wybawi Cię z opresji -<br /> 5 ciast na każdą okazję
      </h3>

      <div className={styles.newsletter}>
        <span className={styles.label}>dołącz do newsletter i otrzymaj e-booka</span>
        <NewsletterForm isSplitted />
      </div>
    </div>
    <CakesIcon className={styles.cakes} />
    <SmallCakesIcon className={styles.smallCakes} />
  </section>
);

Newsletter.displayName = "Newsletter";
