import styles from "./Banner.module.scss";
import { memo } from "react";
import clsx from "clsx";
import { Badge } from "components/common/badge/Badge";
import Link from "next/link";
import Image from "next/image";

type BannerProps = {
  readonly label: string;
  readonly title: string;
  readonly reverse?: boolean;
  readonly variant: "red" | "green";
  readonly link: {
    url: string;
    title: string;
  };
  readonly description?: string;
  readonly imageSrc: string;
  readonly imageOnMobile?: boolean;
};

export const Banner = memo<BannerProps>(
  ({ label, title, reverse = false, variant, link, description, imageSrc, imageOnMobile = true }) => {
    return (
      <div className={clsx(styles.wrapper, styles[variant], { [styles.reverse]: reverse })}>
        <div className={styles.content}>
          <Badge variant={variant} text={label} direction={"right"} />
          <h2 className={styles.title}>{title}</h2>

          {description ? (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          ) : null}

          <Link href={link.url}>
            <a className={styles.link}>{link.title}</a>
          </Link>
        </div>
        <div className={clsx(styles.image, { [styles.hidden]: !imageOnMobile })}>
          <Image src={imageSrc} alt="" layout="fill" objectFit="cover" />
        </div>
      </div>
    );
  },
);

Banner.displayName = "Banner";
