import { memo } from "react";

import { Banner } from "components/common/banner/Banner";
import { Hero } from "components/common/hero/Hero";
import { Explore } from "components/explore/Explore";
import { InstagramSection } from "components/home/instagram/Instagram";
import { QuoteSection } from "components/home/quote/Quote";
import { NewsletterSection } from "components/section/newsletterSection/NewsletterSection";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSlider";
import { PostTile } from "components/tile/postTile/PostTile";

import styles from "./Home.module.scss";

import type { Tag, PostTile as PostTileType, PostTileWithBlur } from "types";

type HomeViewProps = {
  readonly tags: Tag[];
  readonly podcast: PostTileType;
  readonly posts: PostTileWithBlur[];
  readonly placesPosts: PostTileWithBlur[];
  readonly mostViewedPosts: PostTileWithBlur[];
  readonly about: { excerpt: string; image: string };
};

export const HomeView = memo<HomeViewProps>(
  ({ tags, posts, podcast, mostViewedPosts, about, placesPosts }) => (
    <>
      <Hero post={posts[0]} title="logo" />
      <aside className={styles.wrapper}>
        <div className={styles.explore}>
          <Explore tags={tags} />
        </div>
        <div className={styles.posts}>
          {posts.slice(1, 3).map((post) => (
            <div className={styles.post} key={post.id}>
              <PostTile post={post} />
            </div>
          ))}
        </div>
      </aside>
      <Banner
        label="podcast"
        title={podcast.title}
        link={{ url: `/mowie/${podcast.slug}`, title: "posłuchaj" }}
        variant="green"
        imageSrc={podcast.acf.image}
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
  ),
);

HomeView.displayName = "HomeView";
