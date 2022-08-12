import styles from "./PostTile.module.scss";
import { memo } from "react";
import Link from "next/link";
import ArrowIcon from "public/svg/arrow.svg";
import type { Category } from "types";

type PostTileProps = {
  readonly excerpt: string;
  readonly slug: string;
  readonly title: string;
  readonly imageUrl: string;
  readonly tag: string;
  readonly category: Category;
};

export const PostTile = memo<PostTileProps>(({ excerpt, slug, title, imageUrl, tag, category }) => {
  return (
    <article className={styles.post} key={slug}>
      <Link href={`/${category.slug}/${slug}`}>
        <a>
          <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
              <div className={styles.image} style={{ backgroundImage: `url(${imageUrl})` }}></div>
            </div>
            <span className={styles.category}>{category.name}</span>
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: excerpt ? (excerpt.length > 203 ? `${excerpt.slice(0, 200)}...` : excerpt) : "",
                }}
              ></div>
            </div>
          </div>
          <ArrowIcon className={styles.arrow} />
        </a>
      </Link>
    </article>
  );
});

PostTile.displayName = "PostTile";
