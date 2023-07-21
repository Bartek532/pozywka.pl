"use client";

import Link from "next/link";
import { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { PostTile } from "components/tile/postTile/PostTile";

import styles from "./PostsSlider.module.scss";

import type { Tag, PostTileWithBlur } from "types";

type PostsSliderProps = {
  readonly title: string;
  readonly posts: PostTileWithBlur[];
  readonly tags: Tag[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1401 },
    items: 2.5,
  },
  desktopSmall: {
    breakpoint: { max: 1400, min: 1141 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1140, min: 993 },
    items: 1.5,
  },
  mobile: {
    breakpoint: { max: 992, min: 0 },
    items: 1,
  },
};

export const PostsSlider = memo<PostsSliderProps>(({ title, posts, tags }) => {
  const tag = tags.find(({ name }) => name === title);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {tag ? (
          <Link href={`/szukaj?tags=${tag.slug}`}>#{title}</Link>
        ) : (
          <span className={styles.plain}>{title}</span>
        )}
      </h2>
      <div className={styles.carousel}>
        <Carousel
          swipeable
          draggable
          responsive={responsive}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {posts.map((post) => (
            <PostTile post={post} key={post.id} />
          ))}
        </Carousel>
      </div>
    </section>
  );
});

PostsSlider.displayName = "PostsSlider";
