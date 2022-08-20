import styles from "./Hero.module.scss";
import { memo } from "react";
import Link from "next/link";
import { SocialsMenu } from "components/menu/socialsMenu/SocialsMenu";
import { SOCIALS } from "utils/consts";
import ArrowIcon from "public/svg/arrow.svg";
import Logo from "public/svg/logo.svg";
import type { WPPost, Tag } from "types";
import { useRouter } from "next/router";
import Image from "next/image";

type HeroProps = {
  readonly title?: string;
  readonly post: WPPost;
  readonly tags: Tag[];
};

export const Hero = memo<HeroProps>(({ title, post, tags }) => {
  const router = useRouter();
  const tag = tags.find((tag) => tag.slug === post.tags[0])!;

  const isPostView = router.query.slug === post.slug;
  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        {isPostView ? (
          <div className={styles.image}>
            <Image src={post.acf.image} alt={post.title.rendered} layout="fill" objectFit="cover" />
          </div>
        ) : (
          <Link href={`/${post.categories[0]}/${post.slug}`}>
            <a className={styles.image}>
              <Image src={post.acf.image} alt={post.title.rendered} layout="fill" objectFit="cover" />
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
                <h2 className={styles.title}>{post.title.rendered}</h2>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                ></div>
              </div>
              <div className={styles.tag}>{tag.name}</div>
            </div>
          ) : (
            <Link href={`/${post.categories[0]}/${post.slug}`}>
              <a className={styles.post}>
                <div className={styles.postContent}>
                  <h2 className={styles.title}>{post.title.rendered}</h2>
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                  ></div>
                </div>
                <div className={styles.tag}>{tag.name}</div>
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
