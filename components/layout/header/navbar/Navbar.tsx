"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { SearchInput } from "components/form/searchInput/SearchInput";

import styles from "./Navbar.module.scss";

const links = [
  { path: "pisze", name: "Piszę" },
  { path: "mowie", name: "Mówię" },
  { path: "jem", name: "Jem" },
  { path: "o-mnie", name: "O mnie" },
  { path: "wspolpraca", name: "Współpraca" },
];

export const Navbar = ({ isHamburgerOpen }: { isHamburgerOpen: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = ({ query }: { query: string }) => {
    if (query.trim()) {
      router.replace(`/szukaj?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className={clsx(styles.nav, styles.active && { [styles.active]: isHamburgerOpen })}>
      <div className={styles.search}>
        <SearchInput
          onSearch={handleSearch}
          defaultValue={
            searchParams?.get("q") ? decodeURIComponent(searchParams?.get("q") as string) : ""
          }
        />
      </div>
      <ul className={styles.list}>
        {links.map((link) => (
          <li className={styles.item} key={link.path}>
            <Link href={`/${link.path}`}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navbar.displayName = "Navbar";
