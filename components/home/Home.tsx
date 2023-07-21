import { FeaturedPost } from "components/blog/posts/featured/FeaturedPost";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { PostTile } from "components/blog/posts/tile/PostTile";
import { Banner } from "components/common/banner/Banner";
import { Explore } from "components/shared/explore/Explore";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { getTopViews } from "lib/views";
import { fetchPage, fetchPost, fetchPosts } from "lib/wordpress";
import { Post } from "types";

import styles from "./Home.module.scss";
import { Instagram } from "./instagram/Instagram";
import { Quote } from "./quote/Quote";

const fetchTopPosts = async () => {
  const slugs = await getTopViews();
  const posts = await Promise.all(slugs.map(({ slug }: { slug: string }) => fetchPost(slug)));
  const mappedPosts = posts
    .map(({ post }) => post)
    .filter((p): p is Post => !!p)
    .map(({ content, ...rest }) => rest);

  return { posts: mappedPosts };
};

export const Home = async () => {
  const [
    { posts, tags },
    { posts: placesPosts },
    { posts: topPosts },
    {
      posts: [podcast],
    },
    about,
  ] = await Promise.all([
    fetchPosts({ perPage: 3 }),
    fetchPosts({ tags: ["miejsca"] }),
    fetchTopPosts(),
    fetchPosts({ categories: ["mowie"], perPage: 1 }),
    fetchPage("about-me"),
  ]);

  return (
    <>
      {posts[0] && <FeaturedPost post={posts[0]} title="logo" />}
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
      {podcast && typeof podcast.acf.image === "string" && (
        <Banner
          label="podcast"
          title={podcast.title}
          link={{ url: `/mowie/${podcast.slug}`, title: "posłuchaj" }}
          variant="green"
          imageSrc={podcast.acf.image}
        />
      )}
      <PostsSlider title={"Najczęściej czytane"} tags={tags} posts={topPosts} />
      {about && typeof about.acf.profile_image === "string" && (
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
