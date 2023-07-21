import { About } from "components/about/About";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { PostsSlider } from "components/shared/postsSlider/PostsSlider";
import { fetchPosts, fetchTags } from "lib/wordpress";

const AboutPage = async () => {
  const tags = await fetchTags();
  const { posts } = await fetchPosts({ perPage: 10 });

  return (
    <>
      <About />
      <PostsSlider title="Najnowsze" posts={posts} tags={tags} />
      <Newsletter />
    </>
  );
};

export default AboutPage;
