import { Suspense } from "react";

import { Image } from "components/common/image/Image";
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

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <section className={styles.section}>
    <span className={styles.title}>instagram</span>
    {children}
  </section>
);

const LoadingFallback = () => (
  <Wrapper>
    <div className={styles.loading}>
      <Loader />
    </div>
  </Wrapper>
);

const InstagramPosts = async () => {
  const { data, error } = await getPosts();

  if (error) return null;
  if (!data) return <LoadingFallback />;

  return (
    <Wrapper>
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
            <div className={styles.image}>
              <Image src={media_url} alt="" fill />
            </div>
          </a>
        ))}
      </div>
    </Wrapper>
  );
};

export const Instagram = () => (
  <Suspense fallback={<LoadingFallback />}>
    <InstagramPosts />
  </Suspense>
);
