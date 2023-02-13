import { type BoardData } from "@/src/types/board.type";
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
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/src/atoms/user-atom";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import Tooltip from "@mui/material/Tooltip";
import { type DocumentReference, updateDoc } from "firebase/firestore";

interface IProps {
  data?: BoardData;
  docRef: DocumentReference<BoardData>;
}

const UserList: React.FC<IProps> = ({ data, docRef }) => {
  const userVal = useRecoilValue(userAtom);

  const usersMemorised = useMemo(() => {
    return data?.users?.sort((a, b) => a.name?.localeCompare(b?.name));
  }, [data?.users]);

  const isSelfAdmin = useMemo(() => {
    return data?.admin === userVal?.uuid;
  }, [data?.admin, userVal?.uuid]);

  const handleChangeAdmin = async () => {
    if (isSelfAdmin) return;
    try {
      await updateDoc<BoardData>(docRef, {
        admin: userVal?.uuid,
        updated: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (!data) return null;
  const { votes, showResults, admin } = data;

  return (
    <Card sx={(theme) => ({ p: theme.spacing(2) })}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" sx={{ mr: "auto" }}>
          Users
        </Typography>
        <Tooltip title="Take ownership - become moderator">
          <IconButton onClick={handleChangeAdmin}>
            <AddModeratorIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider sx={(theme) => ({ my: theme.spacing(1) })} />
      <List>
        <AnimatePresence>
          {usersMemorised?.map((u) => {
            const userVoted = votes?.find((v) => v.userId === u.uuid);
            const isUserAdmin = admin === u.uuid;
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
                      showResults ? (
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
                        src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${
                          u.name
                        }-${u.uuid.slice(0, 4)}`}
                        alt={`${u.name}'s avatar`}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={(theme) => ({
                          display: "flex",
                          alignItems: "center",
                          gap: theme.spacing(1),
                        })}
                      >
                        {u.name} {isUserAdmin && <LocalPoliceIcon />}
                      </Box>
                    }
                  />
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
