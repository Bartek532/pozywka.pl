import styles from "./InstagramSection.module.scss";
import { memo } from "react";
import type { InstagramPost } from "types";

type InstagramSectionProps = {
  readonly posts: InstagramPost[];
};

export const InstagramSection = memo<InstagramSectionProps>(({ posts }) => {
  return (
    <section className={styles.section}>
      <span className={styles.title}>instagram</span>
      <div className={styles.images}>
        {posts.map(({ permalink, media_url }) => (
          <a href={permalink} target="_blank" rel="noopener noreferrer">
            <div className={styles.image} style={{ backgroundImage: `url(${media_url})` }}></div>
          </a>
        ))}
      </div>
    </section>
  );
});

InstagramSection.displayName = "InstagramSection";
