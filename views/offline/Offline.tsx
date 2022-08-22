import HotDog from "public/svg/hot-dog.svg";
import styles from "./Offline.module.scss";
import Image from "next/image";

export const OfflineView = () => {
  return (
    <div className={styles.offline}>
      <div className={styles.image}>
        <Image src="/svg/hot-dog.svg" alt="hot dog" width="500" height="500" />
      </div>
      <h1 className={styles.title}>Jesteś offline, sprawdź swoje połączenie!</h1>
    </div>
  );
};
