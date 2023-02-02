import { visitedBoardsAtom } from "@/src/atoms/visited-boards";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import ListItemButton from "@mui/material/ListItemButton";
import { useRouter } from "next/router";

const LastVisitedBoards: React.FC = () => {
  const [lastVisited, setLastVisited] = useRecoilState(visitedBoardsAtom);

  const router = useRouter();

  const handleDelete = (id: string) => () => {
    setLastVisited((prev) => prev.filter((board) => board.id !== id));
  };

  const handleRoute = (id: string) => () => {
    router.push(`/board/${id}`);
  };

  if (lastVisited.length === 0) {
    return <Typography>Once you join a board, it will show up here</Typography>;
  }

  return (
    <Box>
      <List>
        {lastVisited.map((board) => (
          <ListItem
            key={board.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDelete(board.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={handleRoute(board.id)}>
              <ListItemText
                primary={board.boardTitle}
                secondary={`Last visited on ${dayjs(board.visitedOn).format(
                  "DD.MM.YYYY (dddd)"
                )}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LastVisitedBoards;
