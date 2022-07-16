import styles from "./PostsSliderSection.module.scss";
import { memo } from "react";
import type { Tag, WPPost } from "types";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { PostTile } from "components/tile/postTile/PostTile";

type PostsSliderSectionProps = {
  readonly title: string;
  readonly posts: WPPost[];
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

export const PostsSliderSection = memo<PostsSliderSectionProps>(({ title, posts, tags }) => {
  const tagSlug = tags.find(({ name }) => name === title)?.slug;
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <Link href={`/search?tags=${tagSlug}`}>
          <a>#{title}</a>
        </Link>
      </h2>
      <div className={styles.carousel}>
        <Carousel swipeable draggable responsive={responsive} transitionDuration={500}>
          {posts.map((post) => (
            <PostTile
              excerpt={post.excerpt.rendered}
              title={post.title.rendered}
              imageUrl={post.acf.image}
              key={post.id}
              //category={post.category}
              slug={post.slug}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
});

PostsSliderSection.displayName = "PostsSliderSection";
