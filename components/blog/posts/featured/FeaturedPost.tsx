import { isString } from "lodash";
import Link from "next/link";
import { memo } from "react";

import { Image } from "components/common/image/Image";
import { SocialsMenu } from "components/shared/socials/SocialsMenu";
import ArrowIcon from "public/svg/arrow.svg";
import Logo from "public/svg/logo.svg";
import { SOCIALS } from "utils/consts";

import styles from "./FeaturedPost.module.scss";

import type { PostTileWithPlaceholder } from "types";

type FeaturedPostProps = {
  readonly title?: string;
  readonly post: PostTileWithPlaceholder;
  readonly isPostView?: boolean;
};

export const FeaturedPost = memo<FeaturedPostProps>(({ title, post, isPostView = false }) => (
  <div className={styles.hero}>
    <div className={styles.imageWrapper}>
      {isPostView
        ? isString(post.acf.image) && (
            <div className={styles.image}>
              <Image
                src={post.acf.image}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                {...(post.placeholder
                  ? { placeholder: "blur", blurDataURL: post.placeholder }
                  : {})}
                priority
              />
            </div>
          )
        : isString(post.acf.image) && (
            <Link href={`/${post.categories[0]?.slug}/${post.slug}`} className={styles.image}>
              <Image
                src={post.acf.image}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                {...(post.placeholder
                  ? { placeholder: "blur", blurDataURL: post.placeholder }
                  : {})}
                priority
              />
            </Link>
          )}
    </div>
    <div className={styles.content}>
      <div className={styles.header}>
        {title ? title === "logo" ? <Logo className={styles.logo} /> : <h1>{title}</h1> : null}
        <div className={styles.socials}>
          <SocialsMenu socials={SOCIALS} />
        </div>
      </div>

      <div className={styles.postWrapper}>
        {isPostView ? (
          <div className={styles.post}>
            <div className={styles.postContent}>
              <h2 className={styles.title}>{post.title}</h2>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: post.excerpt,
                }}
              ></div>
            </div>
            {post.tags.length ? <div className={styles.tag}>{post.tags[0]?.name}</div> : null}
          </div>
        ) : (
          <Link href={`/${post.categories[0]?.slug}/${post.slug}`} className={styles.post}>
            <div className={styles.postContent}>
              <h2 className={styles.title}>{post.title}</h2>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: post.excerpt,
                }}
              ></div>
            </div>
            {post.tags.length ? <div className={styles.tag}>{post.tags[0]?.name}</div> : null}
            <ArrowIcon className={styles.arrow} />
          </Link>
        )}
      </div>
    </div>
  </div>
));

FeaturedPost.displayName = "FeaturedPost";
