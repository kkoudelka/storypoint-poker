import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";

const NameChanger = dynamic(() => import("./name"), {
  ssr: false,
  loading: () => <CircularProgress />,
});

export default NameChanger;
