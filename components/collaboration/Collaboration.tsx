import clsx from "clsx";
import { notFound } from "next/navigation";

import { Banner } from "components/common/banner/Banner";
import { fetchPage } from "lib/wordpress";

import styles from "./Collaboration.module.scss";
import { Hero } from "./hero/Hero";
import { Things } from "./things/Things";
import {
  isCollaborationBannerAcf,
  isCollaborationHeroAcf,
  isThingsAcf,
} from "./utils/validation/validator";

export const Collaboration = async () => {
  const page = await fetchPage("collaboration");

  if (!page) return notFound();

  return (
    <>
      {isCollaborationHeroAcf(page.acf) && (
        <Hero
          title={page.acf.personal_info_title}
          description={page.acf.personal_info}
          image={page.acf.image}
          newsletterLabel={page.acf.newsletter_label}
        />
      )}
      {isThingsAcf(page.acf) && (
        <div className={clsx(styles.container, styles.big)}>
          <Things things={Object.values(page.acf.things_i_do)} />
        </div>
      )}
      {isCollaborationBannerAcf(page.acf) && (
        <Banner
          label="Więcej"
          title={page.acf.collaboration_banner_text}
          imageSrc={page.acf.collaboration_banner_image}
          link={{ url: "mailto:kontakt@pozywka.pl", title: "napisz do mnie" }}
          variant="green"
        />
      )}
      <div className={clsx(styles.container, styles.texts)}>
        <div className="content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
      </div>
    </>
  );
};

Collaboration.displayName = "Collaboration";
