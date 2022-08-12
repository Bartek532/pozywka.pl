import styles from "./Hero.module.scss";
import { memo } from "react";
import Link from "next/link";
import { SocialsMenu } from "components/menu/socialsMenu/SocialsMenu";
import { SOCIALS } from "utils/consts";
import ArrowIcon from "public/svg/arrow.svg";
import Logo from "public/svg/logo.svg";
import type { WPPost, Tag, Category } from "types";

type HeroProps = {
  readonly title: string;
  readonly post: WPPost;
  readonly tags: Tag[];
  readonly categories: Category[];
};

export const Hero = memo<HeroProps>(({ title, post, tags, categories }) => {
  const tag = tags.find((tag) => tag.slug === post.tags[0])!;
  const category = categories.find(({ slug }) => slug === post.categories[0])!;
  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Link href={`/${category.slug}/${post.slug}`}>
          <a className={styles.image} style={{ backgroundImage: `url(${post.acf.image})` }}></a>
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          {title === "logo" ? <Logo className={styles.logo} /> : <h1>{title}</h1>}
          <div className={styles.socials}>
            <SocialsMenu socials={SOCIALS} />
          </div>
        </div>

        <div className={styles.postWrapper}>
          <Link href={`/${category.slug}/${post.slug}`}>
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
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";
