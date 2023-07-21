import { memo, useEffect } from "react";

import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { POSTS_PER_PAGE } from "utils/consts";
import { onPromise } from "utils/functions";

import styles from "./LoadMore.module.scss";

import type { PostTile } from "types";

type LoadMoreProps = {
  readonly posts: PostTile[];
  readonly setPosts: React.Dispatch<React.SetStateAction<PostTile[]>>;
  readonly categories?: string[];
  readonly tags?: string[];
  readonly query?: string;
};

export const LoadMore = memo<LoadMoreProps>(
  ({ posts, setPosts, categories = [], tags = [], query = "" }) => {
    const {
      isLoading,
      isError,
      posts: fetchedPosts,
      getNextPage,
      page,
    } = useInfiniteScroll({
      categories,
      query,
      tags,
      offset: POSTS_PER_PAGE + 1,
    });

    useEffect(() => {
      setPosts((posts) => [...posts, ...fetchedPosts]);
    }, [fetchedPosts, setPosts]);

    if (posts.length < page * POSTS_PER_PAGE) {
      return null;
    }

    if (isLoading) {
      return (
        <div className={styles.loader}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <span className="sr-only">Ładowanie...</span>
        </div>
      );
    }

    if (isError) {
      return <span className={styles.error}>Coś poszło nie tak, spróbuj ponownie później!</span>;
    }

    return (
      <button onClick={onPromise(() => getNextPage())} className={styles.btn}>
        Więcej artykułów
      </button>
    );
  },
);

LoadMore.displayName = "LoadMore";
