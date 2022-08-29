import styles from "./CookiesPopup.module.scss";
import { useLocalStorage } from "lib/hooks/useLocalStorage";
import Link from "next/link";
import CookiesIcon from "public/svg/cookies.svg";

type CookiesPreference = "accepted" | "not-accepted";

export const CookiesPopup = () => {
  const [cookiesSetting, setCookiesSetting] = useLocalStorage<CookiesPreference>("cookies", "not-accepted");

  if (cookiesSetting === "accepted") {
    return null;
  }

  return (
    <div className={styles.cookies}>
      <p className={styles.description}>
        KOCHAM CIASTECZKA, ale dbam też o Twoje bezpieczeństwo. Więcej o ochronie danych przeczytasz{" "}
        <Link href="/polityka-prywatnosci">
          <a className={styles.link}>TUTAJ</a>
        </Link>
        . Klikając Akceptuj, wyrażasz zgodę na używanie ciasteczek w celu usprawnienia korzystania z witryny.
      </p>
      <CookiesIcon />
      <button className={styles.btn} onClick={() => setCookiesSetting("accepted")}>
        Akceptuję!
      </button>
    </div>
  );
};
