import styles from "./Home.module.scss";
import { memo } from "react";
import type { Tag, InstagramPost, WPPost, Category } from "types";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";
import { NewsletterSection } from "components/section/newsletterSection/NewsletterSection";
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
};

export const HomeView = memo<HomeViewProps>(
  ({ tags, posts, newestPodcast, booksPosts, about, instagramPosts, placesPosts }) => {
    return (
      <>
        <Hero post={posts[0]} title="logo" tags={tags} />
        <aside className={styles.wrapper}>
          <div className={styles.explore}>
            <Explore tags={tags} />
          </div>
          <div className={styles.posts}>
            {posts.slice(1, 3).map((post) => {
              return (
                <div className={styles.post}>
                  <PostTile key={post.id} post={post} tags={tags} />
                </div>
              );
            })}
          </div>
        </aside>
        <Banner
          label="podcast"
          title={newestPodcast.title.rendered}
          link={{ url: `/podcasts/${newestPodcast.slug}`, title: "posłuchaj" }}
          variant="green"
          imageSrc={newestPodcast.acf.image}
        />
        <PostsSliderSection title={"Książki"} tags={tags} posts={booksPosts} />
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
        <NewsletterSection />
        <InstagramSection posts={instagramPosts} />
        <PostsSliderSection title={"Miejsca"} tags={tags} posts={placesPosts} />
      </>
    );
  },
);

HomeView.displayName = "HomeView";
