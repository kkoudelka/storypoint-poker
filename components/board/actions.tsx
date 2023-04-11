import { userAtom } from "@/src/atoms/user-atom";
import { BoardData, IVote } from "@/src/types/board.type";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { DocumentReference, updateDoc } from "firebase/firestore";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";

interface IProps {
  docRef: DocumentReference<BoardData>;
  revealed: boolean;
  votes?: IVote[];
  data?: BoardData;
}

const ActionButtons: React.FC<IProps> = ({ docRef, revealed, votes, data }) => {
  const userVal = useRecoilValue(userAtom);

  const isAdmin = useMemo(() => {
    if (!data) return false;
    return data.admin === userVal?.uuid;
  }, [data, userVal?.uuid]);

  const revealResults = async () => {
    if (revealed) return;
    try {
      await updateDoc<BoardData>(docRef, {
        showResults: true,
        updated: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const reset = async () => {
    if (votes?.length === 0 && data?.ticket === null) return;
    try {
      await updateDoc<BoardData>(docRef, {
        showResults: false,
        votes: [],
        updated: new Date(),
        ticket: null,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Fade in={isAdmin} unmountOnExit>
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
      </Fade>
    </>
  );
};

export default ActionButtons;
