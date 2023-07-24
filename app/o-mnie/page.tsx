import { About } from "components/about/About";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { DEFAULT_METADATA, getMetadata } from "lib/metadata";
import { fetchPage, fetchPosts } from "lib/wordpress";
import { escapeHtml } from "utils/functions";
import { isString } from "utils/validation/validator";

export async function generateMetadata() {
  const page = await fetchPage("about-me");

  if (!page) return DEFAULT_METADATA;

  return getMetadata({
    title: page.title,
    description: escapeHtml(page.content),
    ...(isString(page.acf.profile_image) ? { image: page.acf.profile_image } : {}),
  });
}

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
