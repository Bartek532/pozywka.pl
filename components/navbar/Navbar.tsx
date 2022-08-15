import styles from "./Navbar.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import { SearchInput } from "components/form/searchInput/SearchInput";

const links = [
  { path: "posts", name: "Piszę" },
  { path: "podcasts", name: "Mówię" },
  { path: "jem", name: "Jem" },
  { path: "about-me", name: "O mnie" },
  { path: "collaboration", name: "Współpraca" },
];

export const Navbar = ({ isHamburgerOpen }: { isHamburgerOpen: boolean }) => {
  const router = useRouter();
  const handleSearch = ({ query }: { query: string }) => {
    if (query.trim()) {
      router.replace(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  return (
    <nav className={clsx(styles.nav, { [styles.active]: isHamburgerOpen })}>
      <div className={styles.search}>
        <SearchInput
          onSearch={handleSearch}
          defaultValue={router.query.q ? decodeURIComponent(router.query.q as string) : ""}
        />
      </div>
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
