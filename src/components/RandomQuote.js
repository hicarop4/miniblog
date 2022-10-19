import styles from "./RandomQuote.module.css";

const RandomQuote = () => {
  return (
    <div className={styles.container}>
      <p className={styles.p}>
        <span className={styles.name}>David : </span>Do you remember what you
        told me once? That every passing minute is a another chance to turn it
        all around.{" "}
      </p>
      <p className={styles.p}>
        <span className={styles.name}>Sofía : </span>I'll find you again.
      </p>{" "}
      <p className={styles.p}>
        <span className={styles.name}>David : </span> I'll see you in another
        life... when we are both cats.
      </p>
    </div>
  );
};

export default RandomQuote;
