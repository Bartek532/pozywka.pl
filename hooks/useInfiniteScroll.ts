import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { fetchPosts } from "lib/wordpress";
import { POSTS_PER_PAGE } from "utils/consts";

import type { PostTile } from "types";

type UseInfiniteScrollParams = {
  page?: number;
  perPage?: number;
  categories?: string[];
  tags?: string[];
  query?: string;
  offset?: number;
};

export const useInfiniteScroll = ({
  page = 1,
  perPage = POSTS_PER_PAGE,
  categories = [],
  tags = [],
  query = "",
  offset = 0,
}: UseInfiniteScrollParams) => {
  const [fetchedPage, setFetchedPage] = useState(page);
  const [posts, setPosts] = useState<PostTile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const pathname = usePathname();

  const getPage = async (page: number) => {
    setIsLoading(true);
    try {
      const { posts: fetchedPosts } = await fetchPosts({
        perPage,
        categories,
        tags,
        query,
        offset: (page - 2) * perPage + offset,
      });

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
    setFetchedPage(1);
  }, [pathname]);

  return {
    posts,
    isLoading,
    isError,
    getNextPage,
    getPreviousPage,
    page: fetchedPage,
  };
};
