"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <ProgressBar color="#ec5946" height="4px" options={{ showSpinner: false }} />
  </>
);
