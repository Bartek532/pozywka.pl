import { memo } from "react";

import { truncateTextByWordsCount } from "utils/functions";
import { isString } from "utils/validation/validator";

import styles from "./EmbedPostTile.module.scss";

import type { PostTile } from "types";

type EmbedPostTileProps = {
  readonly post: PostTile;
};

export const EmbedPostTile = memo<EmbedPostTileProps>(({ post }) => (
  <a href={`/${post.categories[0]?.slug}/${post.slug}`} className="internal">
    <article className={styles.post} key={post.id}>
      <div className={styles.wrapper}>
        {isString(post.acf.image) && (
          <div className={styles.imageWrapper}>
            <div className={styles.image}>
              <img src={post.acf.image} alt="" style={{ objectFit: "cover" }} />
            </div>
          </div>
        )}
        <div className={styles.info}>
          <h3 className={styles.title}>
            <span>{post.title}</span>
          </h3>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: truncateTextByWordsCount(post.excerpt, 20) }}
          ></div>
        </div>
      </div>
    </article>
  </a>
));

EmbedPostTile.displayName = "EmbedPostTile";
