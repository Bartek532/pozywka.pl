import styles from "./PostsSliderSection.module.scss";
import { memo } from "react";
import type { Tag, Category, WPPost } from "types";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { PostTile } from "components/tile/postTile/PostTile";

type PostsSliderSectionProps = {
  readonly title: string;
  readonly posts: WPPost[];
  readonly categories: Category[];
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

export const PostsSliderSection = memo<PostsSliderSectionProps>(({ title, posts, categories, tags }) => {
  const tag = tags.find(({ name }) => name === title);
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <Link href={`/search?tags=${tag!.slug}`}>
          <a>#{title}</a>
        </Link>
      </h2>
      <div className={styles.carousel}>
        <Carousel swipeable draggable responsive={responsive} transitionDuration={500}>
          {posts.map((post) => {
            const category = categories.find(({ slug }) => slug === post.categories[0]);

            return (
              <PostTile
                excerpt={post.excerpt.rendered}
                title={post.title.rendered}
                imageUrl={post.acf.image}
                key={post.id}
                slug={post.slug}
                tag={category!.name}
              />
            );
          })}
        </Carousel>
      </div>
    </section>
  );
});

PostsSliderSection.displayName = "PostsSliderSection";
