import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Badge } from "components/common/badge/Badge";

import styles from "./Banner.module.scss";

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
  ({
    label,
    title,
    reverse = false,
    variant,
    link,
    description,
    imageSrc,
    imageOnMobile = true,
  }) => (
    <div
      className={clsx(
        styles.wrapper,
        styles[variant],
        styles.reverse && { [styles.reverse]: reverse },
      )}
    >
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

        <Link href={link.url} className={styles.link}>
          {link.title}
        </Link>
      </div>
      <div className={clsx(styles.image, styles.hidden && { [styles.hidden]: !imageOnMobile })}>
        <Image src={imageSrc} alt="" fill style={{ objectFit: "cover" }} />
      </div>
    </div>
  ),
);

Banner.displayName = "Banner";
