import { fetchPage } from "lib/wordpress";

import styles from "./PrivacyPolicy.module.scss";

export const PrivacyPolicy = async () => {
  const page = await fetchPage("privacy-policy");

  if (!page) return null;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Polityka Prywatności</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} className="content"></div>
    </div>
  );
};
