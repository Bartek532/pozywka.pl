import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
