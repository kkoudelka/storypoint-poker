import { useRouter } from "next/router";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "@/src/firebase/firebase-client";
import { BoardData } from "@/src/types/board.type";
import LoadingButton from "@mui/lab/LoadingButton";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { userAtom } from "@/src/atoms/user-atom";
import { useRecoilValue } from "recoil";

const CreateBoard: React.FC = () => {
  const router = useRouter();
  const userVal = useRecoilValue(userAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    boardTitle: string;
  }>();

  const [isCreating, setIsCreating] = useState(false);

  const createNewGame = async ({ boardTitle }: { boardTitle: string }) => {
    if (!userVal?.uuid) return;

    setIsCreating(true);
    const docId = uuidv4();
    const docRef = doc("boards", docId);
    const newGameData: BoardData = {
      boardTitle,
      users: [],
      votes: [],
      logs: [],
      created: new Date(),
      showResults: false,
      admin: userVal?.uuid,
      updated: new Date(),
      ticket: null,
    };

    try {
      await setDoc(docRef, newGameData);
      router.push(`/board/${docId}`);
    } catch (e) {
      console.log(e);
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(createNewGame)}>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(4),
        })}
      >
        <TextField
          {...register("boardTitle", {
            required: true,
            validate: (value) => value.length > 0,
            minLength: 1,
          })}
          error={!!errors.boardTitle}
          label="Game title"
          placeholder="Poker pro webové kočky"
          variant="standard"
          autoComplete="off"
        />
        <LoadingButton
          loading={isCreating}
          loadingPosition="start"
          startIcon={<DashboardCustomizeIcon />}
          variant="contained"
          disabled={isCreating}
          type="submit"
          sx={{ color: "white" }}
        >
          Create new board
        </LoadingButton>
      </Box>
    </form>
  );
};

export default CreateBoard;
