import { IVote } from "@/src/types/board.type";
import Box from "@mui/material/Box";
import React, { useMemo } from "react";
import { VictoryContainer, VictoryPie } from "victory";

interface IProps {
  votes: IVote[];
}

const Chart: React.FC<IProps> = ({ votes }) => {
  const groupped = useMemo(() => {
    const groups = votes.reduce((acc, curr) => {
      const { value } = curr;
      if (!acc[value]) {
        acc[value] = 0;
      }
      acc[value] += 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(groups).map(([key, value]) => ({
      x: key,
      y: value,
    }));
  }, [votes]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: 480,
        overflow: "hidden",
      }}
    >
      <VictoryPie
        data={groupped}
        animate={{ duration: 500 }}
        labelRadius={({ innerRadius }) => {
          if (!innerRadius) return 40;
          // @ts-ignore
          return innerRadius + 40;
        }}
        containerComponent={<VictoryContainer responsive={true} />}
        style={{ labels: { fill: "white", fontSize: 40, fontWeight: "bold" } }}
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      />
    </Box>
  );
};

export default Chart;
