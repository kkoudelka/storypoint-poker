import React, { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { m } from "framer-motion";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { goBackAtom } from "@/src/atoms/goBack";
import Footer from "../footer/footer";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [, setGoBack] = useRecoilState(goBackAtom);
  const router = useRouter();

  const handleGoToChangeName = () => {
    // if router as path matches /board/
    if (router.asPath.match(/\/board\/.*/)) {
      // set go back to router as path
      setGoBack(router.asPath);
    }
    router.push("/name");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Box sx={{ mr: "auto" }}>
              <Link href="/">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textDecoration: "none", color: "white" }}
                >
                  Alza Storypoint Poker
                </Typography>
              </Link>
            </Box>
            <Button color="inherit" onClick={handleGoToChangeName}>
              {"Change username"}
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Box
          sx={(theme) => ({
            mt: theme.spacing(2),
            [theme.breakpoints.down("md")]: {
              pb: theme.spacing(2),
            },
          })}
        >
          <main>{children}</main>
          <Footer />
        </Box>
      </m.div>
    </>
  );
};

export default Layout;
