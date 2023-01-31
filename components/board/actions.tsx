import { BoardData, IVote } from "@/src/types/board.type";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DocumentReference, updateDoc } from "firebase/firestore";
import React from "react";

interface IProps {
  docRef: DocumentReference<BoardData>;
  revealed: boolean;
  votes?: IVote[];
}

const ActionButtons: React.FC<IProps> = ({ docRef, revealed, votes }) => {
  const revealResults = async () => {
    if (revealed) return;
    try {
      await updateDoc<BoardData>(docRef, {
        showResults: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const reset = async () => {
    if (votes?.length === 0) return;
    try {
      await updateDoc<BoardData>(docRef, {
        showResults: false,
        votes: [],
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(4),
        mt: theme.spacing(5),
      })}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{ color: "white" }}
        onClick={revealResults}
        disabled={revealed || votes?.length === 0}
      >
        Reveal results
      </Button>
      <Button variant="contained" color="error" onClick={reset}>
        Reset
      </Button>
    </Box>
  );
};

export default ActionButtons;
