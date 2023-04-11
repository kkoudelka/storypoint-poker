import { type BoardData } from "@/src/types/board.type";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

const formatToTwoDigits = (num: number) => num.toString().padStart(2, "0");

interface IProps {
  data: BoardData;
}

const Timer: React.FC<IProps> = ({ data }) => {
  const { seconds, minutes, isRunning, pause, reset } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    if (data.showResults && isRunning) {
      pause();
    }
  }, [data.showResults, isRunning, pause]);

  useEffect(() => {
    if (data.ticket === null) {
      reset();
    }
  }, [data.ticket, reset]);

  return (
    <Box>
      <Typography>
        Voting {formatToTwoDigits(minutes)}:{formatToTwoDigits(seconds)}
      </Typography>
    </Box>
  );
};

export default Timer;
