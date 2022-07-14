import { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Layout.module.scss";
import { Navbar } from "components/navbar/Navbar";
import { Footer } from "components/footer/Footer";
//import { CookiesPopup } from "components/CookiesPopup/CookiesPopup";
import Logo from "public/svg/logo.svg";
import HamburgerIcon from "public/svg/hamburger.svg";
import CloseIcon from "public/svg/close.svg";
import clsx from "clsx";
import { NextSeo } from "next-seo";
import Link from "next/link";
import type { YoastHead } from "types";
//import { NavControls } from "components/Navbar/NavControls/NavControls";

import { titleTemplate as defaultTitleTemplate } from "pages/_app";

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly head?: YoastHead;
  readonly titleTemplate?: string;
};

export const Layout = memo<LayoutProps>(({ children, title, subtitle, head, titleTemplate = defaultTitleTemplate }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.content}>
      {/*<CookiesPopup />*/}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/">
            <a>
              <Logo className={styles.logo} />
              <span className="sr-only">strona główna</span>
            </a>
          </Link>
          {isHamburgerOpen ? (
            <CloseIcon className={styles.close} onClick={() => setIsHamburgerOpen(false)} />
          ) : (
            <HamburgerIcon className={styles.hamburger} onClick={() => setIsHamburgerOpen(true)} />
          )}
          <Navbar isHamburgerOpen={isHamburgerOpen} />
        </div>

        {/*
        
        <button
          onClick={() => setIsHamburgerOpen((val) => !val)}
          className={clsx(styles.hamburger, {
            [styles.hamburgerOpen]: isHamburgerOpen,
          })}
          title={`${isHamburgerOpen ? "Zamknij" : "Otwórz"} menu`}
          aria-haspopup="true"
          aria-controls="navigation"
          aria-expanded="false"
        >
          <span className="sr-only">{isHamburgerOpen ? "Zamknij" : "Otwórz"} menu</span>
        </button>
        */}
      </header>
      {children}

      <Footer />

      {/*
      {title ? <h1 className={styles.title}>{title}</h1> : null}
      {subtitle ? <h2 className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }}></h2> : null}
        */}

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
