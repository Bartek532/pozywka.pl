import { FeaturedPost } from "components/blog/posts/featured/FeaturedPost";
import { Posts } from "components/blog/posts/Posts";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { getPlaceholders } from "lib/images";
import { getMetadata } from "lib/metadata";
import { fetchCategories, fetchPosts, fetchTags } from "lib/wordpress";
import { Category, Tag } from "types";
import { QUERY_SEPARATOR } from "utils/consts";

const getTitle = (categories: Category[], tags: Tag[], query?: string) =>
  query
    ? `"${query}"`
    : tags.length
    ? tags.map((tag) => `#${tag.name.replace(/\s/g, "")}`).join(", ")
    : categories.length
    ? categories.map((category) => category.name).join(", ")
    : "Wszystkie artykuły";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const categories = await fetchCategories();
  const tags = await fetchTags();

  const desiredTags = tags.filter(
    ({ slug }) => searchParams?.tags?.split(QUERY_SEPARATOR).includes(slug),
  );

  const desiredCategories = categories.filter(
    ({ slug }) => searchParams?.categories?.split(QUERY_SEPARATOR).includes(slug),
  );

  return getMetadata({
    title: getTitle(desiredCategories, desiredTags, searchParams?.q),
  });
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const { posts, tags, categories } = await fetchPosts({
    ...(searchParams?.categories
      ? { categories: searchParams?.categories.split(QUERY_SEPARATOR) }
      : {}),
    ...(searchParams?.tags ? { tags: searchParams?.tags.split(QUERY_SEPARATOR) } : {}),
    ...(searchParams?.q ? { query: searchParams.q } : {}),
    perPage: 11,
  });

  const desiredTags = tags.filter(
    ({ slug }) => searchParams?.tags?.split(QUERY_SEPARATOR).includes(slug),
  );

  const desiredCategories = categories.filter(
    ({ slug }) => searchParams?.categories?.split(QUERY_SEPARATOR).includes(slug),
  );

  const { posts: newestPosts } = await fetchPosts({ perPage: 10 });
  const title = getTitle(desiredCategories, desiredTags, searchParams?.q);

  const [postsWithPlaceholders, newestPostsWithPlaceholders] = await Promise.all([
    getPlaceholders(posts),
    getPlaceholders(newestPosts),
  ]);

  return (
    <>
      {postsWithPlaceholders[0] && <FeaturedPost post={postsWithPlaceholders[0]} title={title} />}
      <Posts
        posts={posts}
        tags={desiredTags}
        categories={desiredCategories}
        {...(searchParams?.q ? { query: searchParams?.q } : {})}
      />
      <PostsSlider title="Najnowsze" posts={newestPostsWithPlaceholders} tags={tags} />
    </>
  );
};

export default SearchPage;
