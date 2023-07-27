import clsx from "clsx";
import Link from "next/link";
import { Suspense, memo } from "react";

import { Loader } from "components/common/loader/Loader";

import styles from "./Navbar.module.scss";
import { SearchBox } from "./SearchBox";

const links = [
  { path: "pisze", name: "Piszę" },
  { path: "mowie", name: "Mówię" },
  { path: "jem", name: "Jem" },
  { path: "o-mnie", name: "O mnie" },
  { path: "wspolpraca", name: "Współpraca" },
];

interface NavbarProps {
  isHamburgerOpen: boolean;
}

export const Navbar = memo<NavbarProps>(({ isHamburgerOpen }) => (
  <nav className={clsx(styles.nav, styles.active && { [styles.active]: isHamburgerOpen })}>
    <div className={styles.search}>
      <Suspense
        fallback={
          <div className={styles.loader}>
            <Loader />
          </div>
        }
      >
        <SearchBox />
      </Suspense>
    </div>
    <ul className={styles.list}>
      {links.map((link) => (
        <li className={styles.item} key={link.path}>
          <Link href={`/${link.path}`}>{link.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
));

Navbar.displayName = "Navbar";
