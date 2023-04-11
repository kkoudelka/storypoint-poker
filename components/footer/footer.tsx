import Box from "@mui/material/Box";
import React from "react";
import getConfig from "next/config";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
  const { publicRuntimeConfig } = getConfig();

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        position: "absolute",
        bottom: 0,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Typography>v{publicRuntimeConfig.build}</Typography>
    </Box>
  );
};

export default Footer;
