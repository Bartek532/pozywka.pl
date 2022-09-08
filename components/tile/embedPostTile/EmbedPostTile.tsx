import styles from "./EmbedPostTile.module.scss";
import { memo } from "react";
import Image from "next/image";
import type { WPPost } from "types";
import { truncateTextByWordsCount } from "utils/functions";

type EmbedPostTileProps = {
  readonly post: WPPost;
};

export const EmbedPostTile = memo<EmbedPostTileProps>(({ post }) => {
  return (
    <article className={styles.post} key={post.id}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <Image src={post.acf.image} alt="" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>
            <span>{post.title.rendered}</span>
          </h3>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: truncateTextByWordsCount(post.excerpt.rendered, 20) }}
          ></div>
        </div>
      </div>
    </article>
  );
});

EmbedPostTile.displayName = "EmbedPostTile";