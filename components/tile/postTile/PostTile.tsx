import styles from "./PostTile.module.scss";
import { memo } from "react";
import Link from "next/link";
import ArrowIcon from "public/svg/arrow.svg";
import type { WPPost, Tag } from "types";
import Image from "next/image";
import { truncateTextByWordsCount } from "utils/functions";

type PostTileProps = {
  readonly post: WPPost & { blurredImage?: string };
  readonly tags: Tag[];
};

export const PostTile = memo<PostTileProps>(({ post, tags }) => {
  const tag = tags.find(({ slug }) => slug === post.tags[0]);
  return (
    <article className={styles.post} key={post.id}>
      <Link href={`/${post.categories[0]}/${post.slug}`}>
        <a>
          <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
              <div className={styles.image}>
                <Image
                  src={post.acf.image}
                  alt={post.title.rendered}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={post.blurredImage}
                />
              </div>
            </div>
            <span className={styles.category}>{tag?.name}</span>
            <div className={styles.content}>
              <h3 className={styles.title}>
                <span>{post.title.rendered}</span>
              </h3>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: truncateTextByWordsCount(post.excerpt.rendered, 29),
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
