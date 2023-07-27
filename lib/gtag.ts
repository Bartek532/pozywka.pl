import { env } from "env/client";

export const reportPageView = (url: string) => {
  if (typeof window !== "undefined") {
    // @ts-expect-error - gtag is defined in the script
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    window.gtag("config", env.NEXT_PUBLIC_GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
