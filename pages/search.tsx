import { Layout } from "components/layout/Layout";
import { PostsView } from "views/posts/Posts";
import { GetServerSideProps } from "next";
import { fetchArticles } from "pages/api/posts";
import type { WPPost, Tag } from "types";

const Search = ({ articles, tags, query }: { articles: WPPost[]; tags: Tag[]; query: string }) => {
  return (
    <Layout title={query ? `"${query}"` : "Wszystkie artykuły"}>
      <PostsView posts={articles} tags={tags} title={query ? `"${query}"` : "Wszystkie artykuły"} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { articles, tags } = await fetchArticles({
    categories: (query.categories as string)?.split(" "),
    tags: (query.tags as string)?.split(" "),
    query: query.q as string,
    perPage: 11,
  });

  return {
    props: {
      articles,
      tags,
      query: query.q || null,
    },
  };
};

export default Search;
