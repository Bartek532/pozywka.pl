import styles from "./PostTile.module.scss";
import { memo } from "react";
import Link from "next/link";
import ArrowIcon from "public/svg/arrow.svg";
import type { WPPost, Tag } from "types";
import Image from "next/image";

type PostTileProps = {
  readonly post: WPPost;
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
                <Image src={post.acf.image} alt={post.title.rendered} layout="fill" objectFit="cover" />
              </div>
            </div>
            <span className={styles.category}>{tag?.name}</span>
            <div className={styles.content}>
              <h3 className={styles.title}>{post.title.rendered}</h3>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered
                    ? post.excerpt.rendered.length > 203
                      ? `${post.excerpt.rendered.slice(0, 200)}...`
                      : post.excerpt.rendered
                    : "",
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
