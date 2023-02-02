import Layout from "@/components/layout/layout";
import OgMeta from "@/components/meta/og";
import NameChanger from "@/components/name/name-changer";
import { appName } from "@/src/utils";
import Container from "@mui/material/Container";
import type { NextPage } from "next";

const ChangeName: NextPage = () => {
  return (
    <Layout>
      <OgMeta title={`Change name | ${appName}`} />
      <Container maxWidth="sm">
        <NameChanger />
      </Container>
    </Layout>
  );
};

export default ChangeName;
