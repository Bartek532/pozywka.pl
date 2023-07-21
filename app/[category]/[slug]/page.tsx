import { notFound } from "next/navigation";

import { Post } from "components/blog/posts/post/Post";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { fetchPost, fetchPosts } from "lib/wordpress";

interface PostParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { posts } = await fetchPosts({ perPage: 10 });
  return posts.map(({ slug }) => ({ slug }));
}

const PostPage = async ({ params }: PostParams) => {
  const { post } = await fetchPost(params.slug);

  if (!post) return notFound();

  const { posts, tags } = await fetchPosts({ perPage: 10 });

  return (
    <>
      <Post post={post} tags={tags} />
      <PostsSlider posts={posts} tags={tags} title="Może Cię też zainteresować" />
    </>
  );
};

export default PostPage;
