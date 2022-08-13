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
      <nav className={styles.nav}>
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li className={styles.tag} key={tag.id}>
              <Link href={`/search?tags=${tag.slug}`}>
                <a>{tag.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

Explore.displayName = "Explore";
