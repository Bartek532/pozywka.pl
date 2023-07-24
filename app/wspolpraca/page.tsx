import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { Collaboration } from "components/collaboration/Collaboration";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { DEFAULT_METADATA, getMetadata } from "lib/metadata";
import { fetchPage, fetchPosts } from "lib/wordpress";
import { escapeHtml } from "utils/functions";
import { isString } from "utils/validation/validator";

export async function generateMetadata() {
  const page = await fetchPage("collaboration");

  if (!page) return DEFAULT_METADATA;

  return getMetadata({
    title: page.title,
    ...(isString(page.acf.personal_info)
      ? { description: escapeHtml(page.acf.personal_info) }
      : {}),
    ...(isString(page.acf.image) ? { image: page.acf.image } : {}),
  });
}

const CollaborationPage = async () => {
  const { posts, tags } = await fetchPosts({ perPage: 10 });

  return (
    <>
      <Collaboration />
      <PostsSlider title="Najnowsze" posts={posts} tags={tags} />
      <Newsletter />
    </>
  );
};

export default CollaborationPage;
