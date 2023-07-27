import { Suspense } from "react";

import { Loader } from "components/common/loader/Loader";

import { fetchMyLastInstagramPosts } from "./api/instagram";
import styles from "./Instagram.module.scss";

const getPosts = async () => {
  try {
    const data = await fetchMyLastInstagramPosts();

    return { data, error: null };
  } catch (e) {
    if (e instanceof Error) {
      return { data: null, error: e.message };
    }
    return { data: null, error: "Unexpected error occurred!" };
  }
};

const LoadingFallback = () => (
  <div className={styles.loading}>
    <Loader />
  </div>
);

const InstagramPosts = async () => {
  const { data, error } = await getPosts();

  if (error) return null;
  if (!data) return <LoadingFallback />;

  return (
    <section className={styles.section}>
      <span className={styles.title}>instagram</span>
      <div className={styles.images}>
        {data.map(({ permalink, media_url, caption }) => (
          <a
            href={permalink}
            target="_blank"
            rel="noopener noreferrer"
            key={permalink}
            className={styles.link}
          >
            <span className="sr-only">{caption}</span>
            <img className={styles.image} src={media_url} alt="" />
          </a>
        ))}
      </div>
    </section>
  );
};

export const Instagram = () => (
  <Suspense fallback={<LoadingFallback />}>
    <InstagramPosts />
  </Suspense>
);
