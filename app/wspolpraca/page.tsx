import { Collaboration } from "components/collaboration/Collaboration";
import { Newsletter } from "components/shared/newsletter/Newsletter";
import { PostsSlider } from "components/shared/postsSlider/PostsSlider";
import { fetchPosts, fetchTags } from "lib/wordpress";

const CollaborationPage = async () => {
  const tags = await fetchTags();
  const { posts } = await fetchPosts({ perPage: 10 });

  return (
    <>
      <Collaboration />
      <PostsSlider title="Najnowsze" posts={posts} tags={tags} />
      <Newsletter />
    </>
  );
};

export default CollaborationPage;
