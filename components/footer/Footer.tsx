import clsx from "clsx";
import Link from "next/link";

import { NewsletterForm } from "components/form/newsletterForm/NewsletterForm";
import { SOCIALS } from "utils/consts";
import { SocialsMenu } from "components/menu/socialsMenu/SocialsMenu";
import LogoSmall from "public/svg/logo-small.svg";


import styles from "./Footer.module.scss";

const footerLinks = [
  { path: "/o-mnie", name: "O mnie" },
  { path: "/wspolpraca", name: "Współpraca" },
  { path: "mailto:pozywkaa@gmail.com", name: "Kontakt" },
  { path: "/polityka-prywatnosci", name: "Polityka Prywatności" },
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
              <span className="sr-only">strona główna</span>
              <LogoSmall className={styles.logo} />
            </a>
          </Link>
          <FooterNav />
          <p className={styles.copyright}>All Rights Reserved © Dominika Zagrodzka {new Date().getFullYear()}</p>
        </div>
        <div className={clsx(styles.column, styles.second)}>
          <FooterNav />
          <div className={styles.newsletter}>
            <span className={styles.title}>bądź na bieżąco</span>
            <NewsletterForm />
          </div>
        </div>
      </div>
      <aside className={styles.sidebar}>
        <SocialsMenu socials={SOCIALS} />
      </aside>
    </footer>
  );
};

Footer.displayName = "Footer";
