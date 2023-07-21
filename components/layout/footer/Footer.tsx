import clsx from "clsx";
import Link from "next/link";

import { SocialsMenu } from "components/shared/socials/SocialsMenu";
import LogoSmall from "public/svg/logo-small.svg";
import { SOCIALS } from "utils/consts";

import styles from "./Footer.module.scss";

const footerLinks = [
  { path: "/o-mnie", name: "O mnie" },
  { path: "/wspolpraca", name: "Współpraca" },
  { path: "mailto:pozywkaa@gmail.com", name: "Kontakt" },
  { path: "/polityka-prywatnosci", name: "Polityka Prywatności" },
];

const FooterNav = () => (
  <ul className={styles.links}>
    {footerLinks.map((link) => (
      <li className={styles.link} key={link.path}>
        <Link href={link.path}>{link.name}</Link>
      </li>
    ))}
  </ul>
);

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.main}>
      <div className={clsx(styles.column, styles.first)}>
        <Link href="/">
          <span className="sr-only">strona główna</span>
          <LogoSmall className={styles.logo} />
        </Link>
        <FooterNav />
        <p className={styles.copyright}>
          All Rights Reserved © Dominika Zagrodzka {new Date().getFullYear()}
        </p>
      </div>
      <div className={clsx(styles.column, styles.second)}>
        <FooterNav />
        <div className={styles.newsletter}>
          <span className={styles.title}>bądź na bieżąco</span>
          {/* <NewsletterForm /> */}
        </div>
      </div>
    </div>
    <aside className={styles.sidebar}>
      <SocialsMenu socials={SOCIALS} />
    </aside>
  </footer>
);

Footer.displayName = "Footer";
