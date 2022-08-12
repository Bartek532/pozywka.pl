import styles from "./Home.module.scss";
import { memo } from "react";
import type { Tag, InstagramPost, WPPost, Category } from "types";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";
import { InstagramSection } from "components/section/instagramSection/InstagramSection";
import { Banner } from "components/common/banner/Banner";
import { Hero } from "components/common/hero/Hero";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";
import { Explore } from "components/explore/Explore";
import { PostTile } from "components/tile/postTile/PostTile";

type HomeViewProps = {
  readonly tags: Tag[];
  readonly instagramPosts: InstagramPost[];
  readonly newestPodcast: WPPost;
  readonly posts: WPPost[];
  readonly placesPosts: WPPost[];
  readonly booksPosts: WPPost[];
  readonly about: { excerpt: string; image: string };
  readonly categories: Category[];
};

export const HomeView = memo<HomeViewProps>(
  ({ tags, posts, newestPodcast, booksPosts, about, instagramPosts, placesPosts, categories }) => {
    return (
      <>
        <Hero post={posts[0]} title="logo" tags={tags} categories={categories} />
        <div className={styles.wrapper}>
          <Explore tags={tags} />
          <div className={styles.posts}>
            {posts.slice(1, 3).map((post) => {
              const category = categories.find((category) => category.slug === post.categories[0])!;
              const tag = tags.find((tag) => tag.slug === post.tags[0])!;

              return (
                <div className={styles.post}>
                  <PostTile
                    tag={tag.name}
                    excerpt={post.excerpt.rendered}
                    slug={post.slug}
                    title={post.title.rendered}
                    imageUrl={post.acf.image}
                    key={post.id}
                    category={category}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Banner
          label="podcast"
          title={newestPodcast.title.rendered}
          link={{ url: `/post/${newestPodcast.slug}`, title: "posłuchaj" }}
          variant="green"
          imageSrc={newestPodcast.acf.image}
        />
        <PostsSliderSection title={"Książki"} categories={categories} tags={tags} posts={booksPosts} />
        <Banner
          label="cześć"
          title="O mnie"
          link={{ url: `/about-me`, title: "więcej o mnie" }}
          variant="red"
          imageSrc={about.image}
          description={about.excerpt}
          reverse
        />
        <QuoteSection />
        <InstagramSection posts={instagramPosts} />
        <PostsSliderSection title={"Miejsca"} categories={categories} tags={tags} posts={placesPosts} />
      </>
    );
  },
);

HomeView.displayName = "HomeView";
