import { useEffect, useState } from "react";

import { fetcher } from "utils/fetcher";
import type { InstagramPost } from "types";
import { Loader } from "components/common/loader/Loader";

import styles from "./InstagramSection.module.scss";

export const InstagramSection = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const { posts: fetchedPosts } = await fetcher("/api/ig", { method: "GET" });
        setPosts(fetchedPosts);
        setIsError(false);
      } catch (e) {
        console.error(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isError) {
    return null;
  }

  return (
    <section className={styles.section}>
      <span className={styles.title}>instagram</span>
      {isLoading ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : (
        <div className={styles.images}>
          {posts.map(({ permalink, media_url, caption }) => (
            <a
              href={permalink}
              target="_blank"
              rel="noopener noreferrer"
              key={permalink}
              className={styles.link}
            >
              <span className="sr-only">{caption}</span>
              <img className={styles.image} src={media_url} alt=""></img>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

InstagramSection.displayName = "InstagramSection";
