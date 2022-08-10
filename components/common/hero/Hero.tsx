import styles from "./Hero.module.scss";
import { memo } from "react";
import Link from "next/link";
import { SocialsMenu } from "components/menu/socialsMenu/SocialsMenu";
import { SOCIALS } from "utils/consts";
import ArrowIcon from "public/svg/arrow.svg";
import Logo from "public/svg/logo.svg";

type HeroProps = {
  readonly title: string;
  readonly post: {
    id: number;
    slug: string;
    title: string;
    tag: string;
    excerpt: string;
    imageUrl: string;
  };
};

export const Hero = memo<HeroProps>(({ title, post }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Link href={`/post/${post.slug}`}>
          <a className={styles.image} style={{ backgroundImage: `url(${post.imageUrl})` }}></a>
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
          <Link href={`/post/${post.slug}`}>
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
              <div className={styles.tag}>{post.tag}</div>
              <ArrowIcon className={styles.arrow} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";
