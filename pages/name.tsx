import Layout from "@/components/layout/layout";
import NameChanger from "@/components/name/name";
import Container from "@mui/material/Container";
import type { NextPage } from "next";
import Head from "next/head";

const ChangeName: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Change name</title>
      </Head>
      <Container maxWidth="sm">
        <NameChanger />
      </Container>
    </Layout>
  );
};

export default ChangeName;
