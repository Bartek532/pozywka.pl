import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

import ArrowIcon from "public/svg/arrow.svg";
import type { PostTileWithBlur } from "types";
import { truncateTextByWordsCount } from "utils/functions";

import styles from "./PostTile.module.scss";

type PostTileProps = {
  readonly post: PostTileWithBlur;
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
                  {...(post.blurredImage
                    ? { placeholder: "blur", blurDataURL: post.blurredImage }
                    : {})}
                />
              </div>
            </div>
            {post.tags.length ? <span className={styles.category}>{post.tags[0].name}</span> : null}
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
