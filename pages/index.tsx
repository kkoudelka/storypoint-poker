import React from "react";
import type { NextPage } from "next/types";
import Container from "@mui/material/Container";
import Layout from "@/components/layout/layout";
import Card from "@mui/material/Card";
import CreateBoard from "@/components/dashboard/create-board";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DynamicLastVisited from "@/components/dashboard/last-visited-dynamic";
import OgMeta from "@/components/meta/og";

const Index: NextPage = () => {
  return (
    <Layout>
      <OgMeta />
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={(theme) => ({
                p: theme.spacing(4),
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(2),
              })}
            >
              <Typography variant="h5" component="h1">
                Create new board
              </Typography>
              <CreateBoard />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={(theme) => ({
                p: theme.spacing(4),
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(2),
              })}
            >
              <Typography variant="h5" component="h1">
                Your past boards
              </Typography>
              <DynamicLastVisited />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Index;
