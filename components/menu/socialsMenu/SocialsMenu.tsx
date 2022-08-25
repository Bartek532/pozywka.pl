import styles from "./SocialsMenu.module.scss";
import { memo } from "react";
import dynamic from "next/dynamic";

type SocialsMenuProps = {
  readonly socials: { slug: string; link: string }[];
};

export const SocialsMenu = memo<SocialsMenuProps>(({ socials }) => {
  return (
    <ul className={styles.socials}>
      {socials.map((social) => {
        const Icon = dynamic(() => import(`public/svg/${social.slug}.svg`));
        return (
          <li className={styles.social} key={social.slug}>
            <a href={social.link} rel="noopener noreferrer" target="_blank">
              <span className="sr-only">{social.slug}</span>
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
});

SocialsMenu.displayName = "SocialsMenu";
