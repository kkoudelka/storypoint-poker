import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";

const DynamicChart = dynamic(() => import("./chart"), {
  loading: () => <CircularProgress />,
});

export default DynamicChart;
