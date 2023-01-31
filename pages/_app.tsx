import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/config/theme";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait" initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </LazyMotion>
      </ThemeProvider>
    </RecoilRoot>
  );
}
