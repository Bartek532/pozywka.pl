import styles from "./PrivacyPolicy.module.scss";
import type { WPPage } from "types";

export const PrivacyPolicyView = ({ page }: { page: WPPage }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Polityka Prywatności</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} className="content"></div>
    </div>
  );
};
