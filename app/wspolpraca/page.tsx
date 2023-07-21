import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { Collaboration } from "components/collaboration/Collaboration";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { fetchPosts } from "lib/wordpress";

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
