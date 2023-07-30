import { isString } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import ArrowIcon from "public/svg/arrow.svg";
import { truncateTextByWordsCount } from "utils/functions";

import styles from "./PostTile.module.scss";

import type { PostTileWithPlaceholder } from "types";

type PostTileProps = {
  readonly post: PostTileWithPlaceholder;
};

export const PostTile = memo<PostTileProps>(({ post }) => (
  <article className={styles.post} key={post.id}>
    <Link href={`/${post.categories[0]?.slug}/${post.slug}`}>
      <div className={styles.wrapper}>
        {isString(post.acf.image) && (
          <div className={styles.imageWrapper}>
            <div className={styles.image}>
              <Image
                src={post.acf.image}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                {...(post.placeholder
                  ? { placeholder: "blur", blurDataURL: post.placeholder }
                  : {})}
              />
            </div>
          </div>
        )}
        {post.tags.length ? <span className={styles.category}>{post.tags[0]?.name}</span> : null}
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
    </Link>
  </article>
));

PostTile.displayName = "PostTile";
