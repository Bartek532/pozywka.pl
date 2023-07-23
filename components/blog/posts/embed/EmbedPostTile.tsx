import Image from "next/image";
import { memo } from "react";

import { truncateTextByWordsCount } from "utils/functions";

import styles from "./EmbedPostTile.module.scss";

import type { Post } from "types";

type EmbedPostTileProps = {
  readonly post: Post;
};

export const EmbedPostTile = memo<EmbedPostTileProps>(({ post }) => (
  <article className={styles.post} key={post.id}>
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <div className={styles.image}>
          <Image src={post.acf.image} alt="" fill style={{ objectFit: "cover" }} />
        </div>
      </div>
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
));

EmbedPostTile.displayName = "EmbedPostTile";
