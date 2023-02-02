import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const DynamicLastVisited = dynamic(() => import("./last-visited-boards"), {
  loading: () => <CircularProgress />,
  ssr: false,
});

export default DynamicLastVisited;
