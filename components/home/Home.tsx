import { Banner } from "components/common/banner/Banner";
import { Hero } from "components/common/hero/Hero";
import { Explore } from "components/explore/Explore";
import { PostsSlider } from "components/shared/postsSlider/PostsSlider";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { PostTile } from "components/tile/postTile/PostTile";
import { fetchPage, fetchPosts } from "lib/wordpress";

import styles from "./Home.module.scss";
import { fetchMyLastInstagramPosts } from "./instagram/api/instagram";
import { Instagram } from "./instagram/Instagram";
import { Quote } from "./quote/Quote";

export const Home = async () => {
  const [
    { posts, tags },
    { posts: placesPosts },
    // { posts: mostViewedPosts },
    {
      posts: [podcast],
    },
    about,
  ] = await Promise.all([
    fetchPosts({ perPage: 3 }),
    fetchPosts({ tags: ["miejsca"] }),
    // fetchMostViewedPosts(),
    fetchPosts({ categories: ["mowie"], perPage: 1 }),
    fetchPage("about-me"),
  ]);

  await fetchMyLastInstagramPosts();

  return (
    <>
      {posts[0] && <Hero post={posts[0]} title="logo" />}
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
      {podcast && (
        <Banner
          label="podcast"
          title={podcast.title}
          link={{ url: `/mowie/${podcast.slug}`, title: "posłuchaj" }}
          variant="green"
          imageSrc={podcast.acf.image}
        />
      )}
      <PostsSlider title={"Najczęściej czytane"} tags={tags} posts={placesPosts} />
      {about && (
        <Banner
          label="cześć"
          title="O mnie"
          link={{ url: `/o-mnie`, title: "więcej o mnie" }}
          variant="red"
          imageSrc={about.acf.profile_image}
          imageOnMobile={false}
          description={about.excerpt}
          reverse
        />
      )}
      <Quote />
      <Newsletter />
      <Instagram />
      <PostsSlider title={"Miejsca"} tags={tags} posts={placesPosts} />
    </>
  );
};

Home.displayName = "Home";
