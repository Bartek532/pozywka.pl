import { Layout } from "components/layout/Layout";
import { PostsView } from "views/posts/Posts";
import { GetServerSideProps } from "next";
import { fetchPosts } from "pages/api/posts";
import type { WPPost, Tag, Category } from "types";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Search = ({
  posts,
  tags,
  query,
  newestPosts,
  searchedTags,
  searchedCategories,
}: {
  posts: WPPost[];
  tags: Tag[];
  query: string;
  newestPosts: WPPost[];
  searchedTags: Tag[];
  searchedCategories: Category[];
}) => {
  console.log(searchedCategories);

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
        tags={tags}
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
    categories: (query.categories as string)?.split(" "),
    tags: (query.tags as string)?.split(" "),
    query: query.q as string,
    perPage: 11,
  });
  const { posts: newestPosts } = await fetchPosts();

  const searchedTags = tags.filter(({ slug }) => (query.tags as string)?.split(" ").includes(slug));
  const searchedCategories = categories.filter(({ slug }) => (query.categories as string)?.split(" ").includes(slug));

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
