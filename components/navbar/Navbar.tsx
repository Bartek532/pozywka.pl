import styles from "./Navbar.module.scss";
import { memo } from "react";
import clsx from "clsx";
import Link from "next/link";

const links = [
  { path: "posts", name: "Piszę" },
  { path: "podcasts", name: "Mówię" },
  { path: "jem", name: "Jem" },
  { path: "about-me", name: "O mnie" },
  { path: "collaboration", name: "Współpraca" },
];

export const Navbar = ({ isHamburgerOpen }: { isHamburgerOpen: boolean }) => {
  return (
    <nav className={clsx(styles.nav, { [styles.active]: isHamburgerOpen })}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li className={styles.item} key={link.path}>
            <Link href={`/${link.path}`}>
              <a>{link.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navbar.displayName = "Navbar";
