import styles from "./PrivacyPolicy.module.scss";
import type { Page } from "types";

export const PrivacyPolicyView = ({ page }: { page: Page }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Polityka Prywatności</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} className="content"></div>
    </div>
  );
};
