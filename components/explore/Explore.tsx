import { memo } from "react";
import Link from "next/link";

import type { Tag } from "types";
import AvocadoIcon from "public/svg/avocado.svg";

import styles from "./Explore.module.scss";

type ExploreProps = {
  readonly tags: Tag[];
};

export const Explore = memo<ExploreProps>(({ tags }) => {
  return (
    <div className={styles.explore}>
      <div className={styles.header}>
        Odkrywaj <AvocadoIcon />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link href={`/szukaj?tags=${tag.slug}`}>
                <a className={styles.tag}>{tag.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

Explore.displayName = "Explore";
