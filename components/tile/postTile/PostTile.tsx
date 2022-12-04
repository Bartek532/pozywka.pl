import styles from "./PostTile.module.scss";
import { memo } from "react";
import Link from "next/link";
import ArrowIcon from "public/svg/arrow.svg";
import type { Post } from "types";
import Image from "next/image";
import { truncateTextByWordsCount } from "utils/functions";

type PostTileProps = {
  readonly post: Post & { blurredImage?: string };
};

export const PostTile = memo<PostTileProps>(({ post }) => {
  return (
    <article className={styles.post} key={post.id}>
      <Link href={`/${post.categories[0].slug}/${post.slug}`}>
        <a>
          <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
              <div className={styles.image}>
                <Image
                  src={post.acf.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  {...(post.blurredImage ? { placeholder: "blur", blurDataURL: post.blurredImage } : {})}
                />
              </div>
            </div>
            <span className={styles.category}>{post.tags[0].name}</span>
            <div className={styles.content}>
              <h3 className={styles.title}>
                <span>{post.title}</span>
              </h3>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: truncateTextByWordsCount(post.excerpt, 29),
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
