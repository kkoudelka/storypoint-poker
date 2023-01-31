import Layout from "@/components/layout/layout";
import NameChanger from "@/components/name/name";
import Container from "@mui/material/Container";
import type { NextPage } from "next";

const ChangeName: NextPage = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <NameChanger />
      </Container>
    </Layout>
  );
};

export default ChangeName;
