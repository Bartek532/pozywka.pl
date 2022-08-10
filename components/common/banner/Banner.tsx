import styles from "./Banner.module.scss";
import { memo } from "react";
import clsx from "clsx";
import { Badge } from "components/common/badge/Badge";
import Link from "next/link";

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
};

export const Banner = memo<BannerProps>(({ label, title, reverse = false, variant, link, description, imageSrc }) => {
  return (
    <div className={clsx(styles.wrapper, styles[variant])}>
      <div className={styles.content}>
        <Badge variant={variant} text={label} direction={"right"} />
        <h2 className={styles.title}>{title}</h2>

        <Link href={link.url}>
          <a className={styles.link}>{link.title}</a>
        </Link>
      </div>
      <div className={styles.image} style={{ backgroundImage: `url(${imageSrc})` }}></div>
    </div>
  );
});

Banner.displayName = "Banner";
