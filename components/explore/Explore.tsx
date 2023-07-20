import Link from "next/link";
import { memo } from "react";

import AvocadoIcon from "public/svg/avocado.svg";

import styles from "./Explore.module.scss";

import type { Tag } from "types";

type ExploreProps = {
  readonly tags: Tag[];
};

export const Explore = memo<ExploreProps>(({ tags }) => (
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
));

Explore.displayName = "Explore";
