import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { useRecoilValue } from "recoil";
import { type DocumentReference, updateDoc } from "firebase/firestore";
import type { BoardData, IVote } from "@/src/types/board.type";
import options from "@/src/config/options";
import { userAtom } from "@/src/atoms/user-atom";

interface IProps {
  docRef: DocumentReference<BoardData>;
  revealed: boolean;
  data?: BoardData;
}

const Board: React.FC<IProps> = ({ docRef, data }) => {
  const userVal = useRecoilValue(userAtom);

  const updateVote = (value: string) => async () => {
    if (!userVal) return;
    if (!data || !userVal.uuid) return;
    const votes = data.votes;

    const filtered = votes.filter((v) => v.userId !== userVal.uuid);

    const self = votes.find((v) => v.userId === userVal.uuid);
    if (self && self.value === value) {
      try {
        await updateDoc<BoardData>(docRef, {
          votes: filtered,
          updated: new Date(),
        });
      } catch (e) {
        console.log(e);
      }
      return;
    }

    const updated: IVote[] = [...filtered, { value, userId: userVal.uuid }];

    try {
      await updateDoc<BoardData>(docRef, {
        votes: updated,
        updated: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const selectedValue = useMemo(
    () => data?.votes.find((v) => v.userId === userVal?.uuid)?.value,
    [data, userVal]
  );

  return (
    <Box>
      <Grid spacing={2} container>
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <Grid item xs={3} md={2} key={`card-${option}`}>
              <Card>
                <CardActionArea
                  sx={(theme) => ({
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "180px",
                    fontSize: "4rem",
                    ...(isSelected && {
                      backgroundColor: theme.palette.primary.dark,
                    }),
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2.5rem",
                      minHeight: "80px",
                    },
                  })}
                  onClick={updateVote(option)}
                >
                  {option}
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Board;
