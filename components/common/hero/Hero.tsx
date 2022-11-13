import styles from "./Hero.module.scss";
import { memo } from "react";
import Link from "next/link";
import { SocialsMenu } from "components/menu/socialsMenu/SocialsMenu";
import { SOCIALS } from "utils/consts";
import ArrowIcon from "public/svg/arrow.svg";
import Logo from "public/svg/logo.svg";
import type { Post, Tag } from "types";
import { useRouter } from "next/router";
import Image from "next/image";

type HeroProps = {
  readonly title?: string;
  readonly post: Post & { blurredImage?: string };
};

export const Hero = memo<HeroProps>(({ title, post }) => {
  const router = useRouter();

  const isPostView = router.query.slug === post.slug;
  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        {isPostView ? (
          <div className={styles.image}>
            <Image
              src={post.acf.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={post.blurredImage}
              priority
            />
          </div>
        ) : (
          <Link href={`/${post.categories[0].slug}/${post.slug}`}>
            <a className={styles.image}>
              <Image
                src={post.acf.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={post.blurredImage}
              />
            </a>
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
              <div className={styles.tag}>{post.tags[0].name}</div>
            </div>
          ) : (
            <Link href={`/${post.categories[0].slug}/${post.slug}`}>
              <a className={styles.post}>
                <div className={styles.postContent}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                  ></div>
                </div>
                <div className={styles.tag}>{post.tags[0].name}</div>
                <ArrowIcon className={styles.arrow} />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";
