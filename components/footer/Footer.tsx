import styles from "./Footer.module.scss";
import { memo } from "react";
import { SOCIALS } from "utils/consts";
import { SocialsMenu } from "components/menu/socialsMenu/SocialsMenu";
import clsx from "clsx";
import LogoSmall from "public/svg/logo-small.svg";
import Link from "next/link";

const footerLinks = [
  { path: "about-me", name: "O mnie" },
  { path: "collaboration", name: "Współpraca" },
  { path: "contact", name: "Kontakt" },
  { path: "privacy-policy", name: "Polityka Prywatności" },
];

const FooterNav = () => {
  return (
    <ul className={styles.links}>
      {footerLinks.map((link) => (
        <li className={styles.link} key={link.path}>
          <Link href={link.path}>
            <a>{link.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={clsx(styles.column, styles.first)}>
          <Link href="/">
            <a>
              <LogoSmall className={styles.logo} />
            </a>
          </Link>
          <FooterNav />
          <p className={styles.copyright}>All Rights Reserved © Dominika Zagrodzka {new Date().getFullYear()}</p>
        </div>
        <div className={clsx(styles.column, styles.second)}>
          <FooterNav />
        </div>
      </div>
      <aside className={styles.sidebar}>
        <SocialsMenu socials={SOCIALS} />
      </aside>
    </footer>
  );
};

Footer.displayName = "Footer";
