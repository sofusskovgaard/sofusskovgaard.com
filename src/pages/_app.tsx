import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { AppProps } from "next/dist/shared/lib/router/router";

import { StoreProvider } from "utils/stores";

const Navbar = dynamic(() => import("components/navbar"));
const Footer = dynamic(() => import("components/footer"));

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

import "styles/core.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const { serverRuntimeConfig } = getConfig();
    const handleRouteChange = (url: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("config", serverRuntimeConfig.GOOGLE_ANALYTICS_KEY, {
        page_path: url,
      });
      console.log("logged", url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <StoreProvider hydrationData={pageProps.hydrationData}>
      {/* <header>
        <Navbar />
      </header> */}
      <main>
        <Component {...pageProps} />
      </main>
      {/* <Footer /> */}
    </StoreProvider>
  );
}

export default MyApp;
