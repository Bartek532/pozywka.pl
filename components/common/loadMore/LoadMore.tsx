import styles from "./LoadMore.module.scss";
import { memo, useEffect } from "react";
import type { Post } from "types";
import { useRouter } from "next/router";
import { useInfiniteScroll } from "lib/hooks/useInfiniteScroll";
import { POSTS_PER_PAGE } from "utils/consts";

type LoadMoreProps = {
  readonly posts: Post[];
  readonly setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  readonly category?: string;
};

export const LoadMore = memo<LoadMoreProps>(({ posts, setPosts, category }) => {
  const router = useRouter();
  const {
    isLoading,
    isError,
    posts: fetchedPosts,
    getNextPage,
    page,
  } = useInfiniteScroll({
    categories: category || (router.query.categories as string),
    query: router.query.q as string,
    tags: router.query.tags as string,
    offset: 11,
  });

  useEffect(() => {
    setPosts((posts) => [...posts, ...fetchedPosts]);
  }, [fetchedPosts]);

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
    <button onClick={() => getNextPage()} className={styles.btn}>
      Więcej artykułów
    </button>
  );
});

LoadMore.displayName = "LoadMore";
