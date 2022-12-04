import { Layout } from "components/layout/Layout";
import { PostsView } from "views/posts/Posts";
import { GetServerSideProps } from "next";
import { fetchPosts } from "pages/api/posts";
import type { Post, Tag, Category } from "types";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";
import { QUERY_SEPARATOR } from "utils/consts";

const Search = ({
  posts,
  tags,
  query,
  newestPosts,
  searchedTags,
  searchedCategories,
}: {
  posts: Post[];
  tags: Tag[];
  query: string;
  newestPosts: Post[];
  searchedTags: Tag[];
  searchedCategories: Category[];
}) => {
  return (
    <Layout
      title={
        query
          ? `"${query}"`
          : searchedTags.length
          ? searchedTags.map((tag) => `#${tag.name.replace(/\s/g, "")}`).join(", ")
          : searchedCategories.length
          ? searchedCategories.map((category) => category.name).join(", ")
          : "Wszystkie artykuły"
      }
    >
      <PostsView
        posts={posts}
        title={
          query
            ? `"${query}"`
            : searchedTags.length
            ? searchedTags.map((tag) => `#${tag.name.replace(/\s/g, "")}`).join(", ")
            : searchedCategories.length
            ? searchedCategories.map((category) => category.name).join(", ")
            : "Wszystkie artykuły"
        }
      />
      <PostsSliderSection title="Najnowsze" posts={newestPosts} tags={tags} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { posts, tags, categories } = await fetchPosts({
    categories: (query.categories as string)?.split(QUERY_SEPARATOR),
    tags: (query.tags as string)?.split(QUERY_SEPARATOR),
    query: query.q as string,
    perPage: 11,
  });
  const { posts: newestPosts } = await fetchPosts();

  const searchedTags = tags.filter(({ slug }) => (query.tags as string)?.split(QUERY_SEPARATOR).includes(slug));
  const searchedCategories = categories.filter(({ slug }) =>
    (query.categories as string)?.split(QUERY_SEPARATOR).includes(slug),
  );

  return {
    props: {
      posts,
      tags,
      query: query.q || null,
      newestPosts,
      searchedTags,
      searchedCategories,
    },
  };
};

export default Search;
