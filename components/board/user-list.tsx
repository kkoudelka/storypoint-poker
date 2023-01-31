import { IUser, IVote } from "@/src/types/board.type";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React, { useMemo } from "react";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import { AnimatePresence, m } from "framer-motion";

interface IProps {
  users: IUser[];
  votes?: IVote[];
  reveal: boolean;
}

const UserList: React.FC<IProps> = ({ users, votes, reveal }) => {
  const usersMemorised = useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);
  return (
    <Card sx={(theme) => ({ p: theme.spacing(2) })}>
      <Typography variant="h5">Users</Typography>
      <List>
        <AnimatePresence>
          {usersMemorised.map((u) => {
            const userVoted = votes?.find((v) => v.user === u.name);
            return (
              <m.li
                key={u.name}
                exit="hidden"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, scaleY: 0 },
                  visible: {
                    opacity: 1,
                    scaleY: 1,
                    transition: { duration: 0.2 },
                  },
                }}
              >
                <ListItem
                  secondaryAction={
                    userVoted ? (
                      reveal ? (
                        <Typography sx={{ fontSize: 20 }}>
                          {userVoted.value}
                        </Typography>
                      ) : (
                        <DoneIcon />
                      )
                    ) : null
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${u.name}`}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={u.name} />
                </ListItem>
              </m.li>
            );
          })}
        </AnimatePresence>
      </List>
    </Card>
  );
};

export default UserList;
