import styles from "./InstagramSection.module.scss";
import { memo } from "react";
import type { InstagramPost } from "types";
import Image from "next/image";

type InstagramSectionProps = {
  readonly posts: InstagramPost[];
};

export const InstagramSection = memo<InstagramSectionProps>(({ posts }) => {
  return (
    <section className={styles.section}>
      <span className={styles.title}>instagram</span>
      <div className={styles.images}>
        {posts.map(({ permalink, media_url }) => (
          <a href={permalink} target="_blank" rel="noopener noreferrer" key={permalink}>
            <div className={styles.image}>
              <Image src={media_url} alt="" layout="fill" objectFit="cover" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
});

InstagramSection.displayName = "InstagramSection";
