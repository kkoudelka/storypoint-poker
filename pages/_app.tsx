import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/config/theme";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Script from "next/script";
import { appName } from "@/src/utils";
import Head from "next/head";
import UserContext from "@/components/user/user-context";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>{appName}</title>
        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/favs/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favs/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favs/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/favs/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/img/favs/safari-pinned-tab.svg"
          color="#ff6600"
        />
        <link rel="shortcut icon" href="/img/favs/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ff6600" />
        <meta
          name="msapplication-config"
          content="/img/favs/browserconfig.xml"
        />
        <meta name="theme-color" content="#ff6600" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LazyMotion features={domAnimation}>
            <UserContext>
              <SnackbarProvider>
                <AnimatePresence mode="wait" initial={true}>
                  <Component {...pageProps} key={router.route} />
                </AnimatePresence>
              </SnackbarProvider>
            </UserContext>
          </LazyMotion>
        </ThemeProvider>
      </RecoilRoot>
      <Script
        async
        src="https://w.appzi.io/w.js?token=8XTDR"
        strategy="afterInteractive"
      />
    </>
  );
}
