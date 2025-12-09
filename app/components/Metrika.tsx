"use client";

import { YandexMetricaProvider } from "@artginzburg/next-ym";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const Metrika = ({ children }: props) => {
  return (
    <YandexMetricaProvider
      tagID={105712863}
      initParameters={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
    >
      {children}
    </YandexMetricaProvider>
  );
};

export default Metrika;
