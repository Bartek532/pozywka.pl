import styles from "./QuoteSection.module.scss";

export const QuoteSection = () => {
  return (
    <section className={styles.section}>
      <p className={styles.text}>
        Słowo “<span className={styles.highlighted}>żarcie</span>” nie jest dla mnie pejoratywne – jest entuzjastyczne i
        radosne{" "}
        <span role="img" aria-label="smile-emoji">
          😉
        </span>
      </p>
    </section>
  );
};
