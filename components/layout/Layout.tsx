import { memo } from "react";

import { CookiesPopup } from "./cookies/CookiesPopup";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import styles from "./layout.module.scss";

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = memo<LayoutProps>(({ children }) => (
  <>
    <div className={styles.content}>
      <CookiesPopup />
      {/* <div className={clsx(styles.imageEgg, { [styles.active]: counter >= 3 })}>
        <Image src="/svg/zmn.png" width="500" height="500" alt="" />
      </div> */}
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  </>
));

Layout.displayName = "Layout";
