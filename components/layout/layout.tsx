import React, { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { m } from "framer-motion";
import { userNameAtom } from "@/src/atoms/name";
import { useRecoilValue } from "recoil";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const userName = useRecoilValue(userNameAtom);

  const isLoggedIn = !!userName;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">Alza Storypoint Poker</Link>
            </Typography>
            <Link href="/name">
              <Button color="inherit">{"Change username"}</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={(theme) => ({ mt: theme.spacing(2) })}>
          <main>{children}</main>
        </Box>
      </m.div>
    </>
  );
};

export default Layout;
