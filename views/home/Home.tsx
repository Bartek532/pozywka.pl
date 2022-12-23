import styles from "./Home.module.scss";
import { memo } from "react";
import type { Tag, Post } from "types";
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
  readonly newestPodcast: Post;
  readonly posts: (Post & { blurredImage?: string })[];
  readonly placesPosts: (Post & { blurredImage?: string })[];
  readonly mostViewedPosts: (Post & { blurredImage?: string })[];
  readonly about: { excerpt: string; image: string };
};

export const HomeView = memo<HomeViewProps>(({ tags, posts, newestPodcast, mostViewedPosts, about, placesPosts }) => {
  return (
    <>
      <Hero post={posts[0]} title="logo" />
      <aside className={styles.wrapper}>
        <div className={styles.explore}>
          <Explore tags={tags} />
        </div>
        <div className={styles.posts}>
          {posts.slice(1, 3).map((post) => {
            return (
              <div className={styles.post} key={post.id}>
                <PostTile post={post} />
              </div>
            );
          })}
        </div>
      </aside>
      <Banner
        label="podcast"
        title={newestPodcast.title}
        link={{ url: `/mowie/${newestPodcast.slug}`, title: "posłuchaj" }}
        variant="green"
        imageSrc={newestPodcast.acf.image}
      />
      <PostsSliderSection title={"Najczęściej czytane"} tags={tags} posts={mostViewedPosts} />
      <Banner
        label="cześć"
        title="O mnie"
        link={{ url: `/o-mnie`, title: "więcej o mnie" }}
        variant="red"
        imageSrc={about.image}
        imageOnMobile={false}
        description={about.excerpt}
        reverse
      />
      <QuoteSection />
      <NewsletterSection />
      <InstagramSection />
      <PostsSliderSection title={"Miejsca"} tags={tags} posts={placesPosts} />
    </>
  );
});

HomeView.displayName = "HomeView";
