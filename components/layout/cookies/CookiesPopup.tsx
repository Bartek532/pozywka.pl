"use client";

import Link from "next/link";

import { useLocalStorage } from "hooks/useLocalStorage";
import CookiesIcon from "public/svg/cookies.svg";

import styles from "./CookiesPopup.module.scss";

type CookiesPreference = "accepted" | "not-accepted";

export const CookiesPopup = () => {
  const [cookiesSetting, setCookiesSetting] = useLocalStorage<CookiesPreference>(
    "cookies",
    "not-accepted",
  );

  if (cookiesSetting === "accepted") {
    return null;
  }

  return (
    <div className={styles.cookies}>
      <p className={styles.description}>
        KOCHAM CIASTECZKA, ale dbam też o Twoje bezpieczeństwo. Więcej o ochronie danych przeczytasz{" "}
        <Link href="/polityka-prywatnosci" className={styles.link}>
          TUTAJ
        </Link>
        . Klikając Akceptuj, wyrażasz zgodę na używanie ciasteczek w celu usprawnienia korzystania z
        witryny.
      </p>
      <CookiesIcon className={styles.icon} />
      <button className={styles.btn} onClick={() => setCookiesSetting("accepted")}>
        Akceptuję!
      </button>
    </div>
  );
};
