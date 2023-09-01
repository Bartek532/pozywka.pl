import { memo } from "react";

import { CookiesPopup } from "./cookies/CookiesPopup";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import styles from "./Layout.module.scss";

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = memo<LayoutProps>(({ children }) => (
  <>
    <div className={styles.content}>
      <CookiesPopup />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  </>
));

Layout.displayName = "Layout";
