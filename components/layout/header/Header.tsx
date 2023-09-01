"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useWindowSize } from "hooks/useWindowSize";
import CloseIcon from "public/svg/close.svg";
import HamburgerIcon from "public/svg/hamburger.svg";
import Logo from "public/svg/logo.svg";
import Egg from "public/svg/zmn.png";
import { playSound } from "utils/functions";

import styles from "./Header.module.scss";
import { Navbar } from "./navbar/Navbar";

export const Header = () => {
  const [counter, setCounter] = useState(0);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { width } = useWindowSize();
  const pathname = usePathname();

  useEffect(() => {
    setIsHamburgerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (counter === 3) {
      void playSound("/sounds/drop.mp3");
    }
  }, [counter]);

  return (
    <>
      <div className={clsx(styles.imageEgg, styles.active && { [styles.active]: counter >= 3 })}>
        <Image src={Egg} alt="" />
      </div>
      <header className={styles.header}>
        <div
          className={clsx(
            styles.headerContent,
            styles.home && {
              [styles.home]: pathname === "/" && width && width > 992,
            },
          )}
        >
          <button
            className={styles.egg}
            name="easter is coming"
            onClick={() => setCounter((p) => p + 1)}
          ></button>

          {width && (width < 992 || pathname !== "/") && (width > 1220 || width < 992) ? (
            <Link href="/">
              <Logo className={clsx(styles.logo)} />
              <span className="sr-only">strona główna</span>
            </Link>
          ) : null}
          {isHamburgerOpen ? (
            <CloseIcon className={styles.close} onClick={() => setIsHamburgerOpen(false)} />
          ) : (
            <HamburgerIcon className={styles.hamburger} onClick={() => setIsHamburgerOpen(true)} />
          )}
          <Navbar isHamburgerOpen={isHamburgerOpen} />
        </div>
      </header>
    </>
  );
};
