import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchPage } from "lib/wordpress";

import styles from "./About.module.scss";
import { isAboutAcf } from "./utils/validation/validator";

export const About = async () => {
  const page = await fetchPage("about-me");

  if (!page || !isAboutAcf(page.acf)) return notFound();

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.column, styles.first)}>
            <h1 className={styles.title}>O mnie</h1>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: page.content }}
            ></div>
          </div>
        </div>
        <div className={clsx(styles.column, styles.second)}>
          <div className={styles.image}>
            <Image width="370" height="350" src={page.acf.profile_image} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.banner}>
        <Image src={page.acf.image} alt="" fill style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.infos}>
        <div className={clsx(styles.info, styles.first)}>
          <div className={styles.image}>
            <Image
              src={page.acf.first_paragraph.image}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: page.acf.first_paragraph.text }}
          ></div>
        </div>
        <div className={clsx(styles.info, styles.second)}>
          <div className={styles.image}>
            <Image
              src={page.acf.second_paragraph.image}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: page.acf.second_paragraph.text }}
          ></div>
        </div>
        <div className={clsx(styles.info, styles.third)}>
          <div className={styles.image}>
            <Image
              src={page.acf.third_paragraph.image}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: page.acf.third_paragraph.text }}
          ></div>
        </div>
      </div>
    </>
  );
};
