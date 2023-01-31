import React, { useDeferredValue, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedCardState } from "@/src/atoms/selectedCard";
import { DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { BoardData } from "@/src/types/board.type";
import { userNameAtom } from "@/src/atoms/name";
import options from "@/src/config/options";

interface IProps {
  docRef: DocumentReference<BoardData>;
  revealed: boolean;
  data?: BoardData;
}

const Board: React.FC<IProps> = ({ docRef, data }) => {
  const uName = useRecoilValue(userNameAtom);

  const updateVote = (value: string) => async () => {
    if (!uName) return;
    try {
      if (!data) return;
      const votes = data.votes;
      const filtered = votes.filter((v) => v.user !== uName);
      const updated = [...filtered, { value, user: uName }];
      await updateDoc<BoardData>(docRef, {
        votes: updated,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCardClick = (option: string) => () => {
    updateVote(option);
  };

  const selectedValue = useMemo(
    () => data?.votes.find((v) => v.user === uName)?.value,
    [data, uName]
  );

  return (
    <Box>
      <Grid spacing={2} container>
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <Grid item xs={2} key={`card-${option}`}>
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
