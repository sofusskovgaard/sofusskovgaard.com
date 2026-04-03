import React, { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/dist/shared/lib/router/router";

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

import "styles/core.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const gaKey = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY;
    const handleRouteChange = (url: string) => {
      (
        window as unknown as {
          gtag: (command: string, id: string, params: Record<string, string>) => void;
        }
      ).gtag("config", gaKey ?? "", {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
