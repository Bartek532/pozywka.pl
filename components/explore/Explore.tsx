import styles from "./Explore.module.scss";
import { memo } from "react";
import type { Tag } from "types";
import Link from "next/link";
import AvocadoIcon from "public/svg/avocado.svg";

type ExploreProps = {
  readonly tags: Tag[];
};

export const Explore = memo<ExploreProps>(({ tags }) => {
  return (
    <div className={styles.explore}>
      <div className={styles.header}>
        Odkrywaj <AvocadoIcon />
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Link href={`search?tags=${tag.slug}`}>
            <a className={styles.tag}>{tag.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
});

Explore.displayName = "Explore";
