import { About } from "components/about/About";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { fetchPosts } from "lib/wordpress";

const AboutPage = async () => {
  const { posts, tags } = await fetchPosts({ perPage: 10 });

  return (
    <>
      <About />
      <PostsSlider title="Najnowsze" posts={posts} tags={tags} />
      <Newsletter />
    </>
  );
};

export default AboutPage;
