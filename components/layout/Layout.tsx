import { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Layout.module.scss";
import { Navbar } from "components/navbar/Navbar";
import { Footer } from "components/footer/Footer";
import { CookiesPopup } from "components/cookiesPopup/CookiesPopup";
import Logo from "public/svg/logo.svg";
import HamburgerIcon from "public/svg/hamburger.svg";
import CloseIcon from "public/svg/close.svg";
import clsx from "clsx";
import { NextSeo } from "next-seo";
import Link from "next/link";
import type { YoastHead } from "types";
import { useWindowSize } from "lib/hooks/useWindowSize";
import Image from "next/image";
import { playSound } from "utils/functions";

import { titleTemplate as defaultTitleTemplate } from "pages/_app";

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly head?: YoastHead;
  readonly titleTemplate?: string;
};

export const Layout = memo<LayoutProps>(({ children, title, head, titleTemplate = defaultTitleTemplate }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const [counter, setCounter] = useState(0);

  const { width } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (counter === 3) {
      playSound("/sounds/drop.mp3");
    }
  }, [counter]);

  return (
    <div className={styles.content}>
      <CookiesPopup />
      <div className={clsx(styles.imageEgg, { [styles.active]: counter >= 3 })}>
        <Image src="/svg/zmn.png" width="500" height="500" alt="" />
      </div>
      <header className={styles.header}>
        <div className={clsx(styles.headerContent, { [styles.home]: router.pathname === "/" && width! > 992 })}>
          <button
            className={styles.egg}
            name="easter is coming"
            onClick={() => setCounter((oldCounter) => oldCounter + 1)}
          ></button>

          {(width! < 992 || router.pathname !== "/") && (width! > 1220 || width! < 992) ? (
            <Link href="/">
              <a>
                <Logo className={clsx(styles.logo)} />
                <span className="sr-only">strona główna</span>
              </a>
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
      <main className={styles.main}>{children}</main>

      <Footer />

      <NextSeo
        title={title ? titleTemplate.replace("%s", title) : titleTemplate.slice(4)}
        description={head?.og_description}
        openGraph={{
          title: title ? titleTemplate.replace("%s", title) : titleTemplate.slice(4),
          site_name: head?.og_site_name,
          url: head?.og_url,
          locale: head?.og_locale,
          type: head?.og_type,
          description: head?.og_description,
          images: head?.og_image,
          article: {
            publishedTime: head?.article_published_time,
            modifiedTime: head?.article_modified_time,
          },
        }}
        twitter={{
          cardType: head?.twitter_card,
        }}
        robotsProps={{
          maxSnippet: Number(head?.robots["max-snippet"]),
          maxVideoPreview: Number(head?.robots["max-video-preview"]),
        }}
        noindex={!(head?.robots.index ? head.robots.index === "index" : true)}
        nofollow={!(head?.robots.follow ? head.robots.follow === "follow" : true)}
        canonical={head?.canonical}
      />
    </div>
  );
});

Layout.displayName = "Layout";
