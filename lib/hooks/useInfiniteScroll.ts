import type { WPPost } from "types";
import { POSTS_PER_PAGE } from "utils/consts";
import { fetcher } from "utils/fetcher";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useInfiniteScroll = ({
  page = 1,
  perPage = POSTS_PER_PAGE,
  categories = "",
  tags = "",
  query = "",
  offset = 0,
}) => {
  const [fetchedPage, setFetchedPage] = useState(page);
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const getPage = async (page: number) => {
    setIsLoading(true);
    try {
      const { posts: fetchedPosts } = await fetcher(
        `/api/posts?per_page=${perPage}&categories=${categories}&tags=${tags}&query=${query}&offset=${
          (page - 2) * perPage + offset
        }`,
        { method: "GET" },
      );

      setPosts(fetchedPosts);
      setIsError(false);
      setFetchedPage((prev) => prev + 1);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextPage = () => getPage(fetchedPage + 1);
  const getPreviousPage = () => getPage(fetchedPage - 1);

  useEffect(() => {
    const handleRouteChange = () => {
      setFetchedPage(1);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return {
    posts,
    isLoading,
    isError,
    getNextPage,
    getPreviousPage,
    page: fetchedPage,
  };
};
