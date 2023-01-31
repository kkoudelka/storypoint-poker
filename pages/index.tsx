import React from "react";
import type { NextPage } from "next/types";
import Container from "@mui/material/Container";
import Layout from "@/components/layout/layout";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "@/src/firebase/firebase-client";
import { useRouter } from "next/router";
import { BoardData } from "@/src/types/board.type";

const Index: NextPage = () => {
  const router = useRouter();

  const createNewGame = async () => {
    const docId = uuidv4();
    const docRef = doc("boards", docId);
    const newGameData: BoardData = {
      users: [],
      votes: [],
      created: new Date(),
      showResults: false,
    };

    try {
      await setDoc(docRef, newGameData);
      router.push(`/board/${docId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Container maxWidth="xl">
        <Card sx={(theme) => ({ p: theme.spacing(4) })}>
          <Button variant="contained" onClick={createNewGame}>
            New game+
          </Button>
        </Card>
      </Container>
    </Layout>
  );
};

export default Index;
