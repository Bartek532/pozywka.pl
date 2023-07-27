import { isString } from "lodash";
import { notFound } from "next/navigation";

import { Post } from "components/blog/posts/post/Post";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { getPlaceholder } from "lib/images";
import { DEFAULT_METADATA, getMetadata } from "lib/metadata";
import { fetchPost, fetchPosts } from "lib/wordpress";
import { escapeHtml } from "utils/functions";

interface PostParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostParams) {
  const { post } = await fetchPost(params.slug);

  if (!post) return DEFAULT_METADATA;

  return getMetadata({
    title: post.title,
    description: escapeHtml(post.excerpt),
    ...(isString(post.acf.image) ? { image: post.acf.image } : {}),
  });
}

export async function generateStaticParams({ params }: { params: { category: string } }) {
  const { posts } = await fetchPosts({ perPage: 10, categories: [params.category] });
  console.log(params);
  return posts.map(({ slug }) => ({ slug }));
}

const PostPage = async ({ params }: PostParams) => {
  const { post } = await fetchPost(params.slug);

  if (!post) return notFound();

  const { posts, tags } = await fetchPosts({ perPage: 11 });

  const isInNewestPosts = posts.some(({ slug }) => slug === params.slug);
  const newestPosts = isInNewestPosts
    ? posts.filter(({ slug }) => slug !== params.slug)
    : posts.slice(0, 10);

  const postWithPlaceholder = await getPlaceholder(post);

  return (
    <>
      <Post post={postWithPlaceholder} tags={tags} />
      <PostsSlider posts={newestPosts} tags={tags} title="Może Cię też zainteresować" />
    </>
  );
};

export default PostPage;
