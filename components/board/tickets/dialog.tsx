import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { DocumentReference, updateDoc } from "firebase/firestore";
import { BoardData } from "@/src/types/board.type";

interface IProps {
  docRef: DocumentReference<BoardData>;
  data?: BoardData;
}

const TicketDialog: React.FC<IProps> = ({ docRef, data }) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<{ ticketName: string }>({
    defaultValues: {
      ticketName: data?.ticket ?? "",
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const clearTicket = async () => {
    try {
      await updateDoc(docRef, {
        ticket: null,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: { ticketName: string }) => {
    try {
      await updateDoc(docRef, {
        ticket: data.ticketName,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip title="Edit ticket">
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Change currently discussed ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The timer will start upon saving the ticket. Timer can be reset by
              the board reset button (will remove ticket).
            </DialogContentText>
            <TextField
              sx={{ mt: 4 }}
              autoFocus
              margin="dense"
              {...register("ticketName")}
              label="Ticket name"
              fullWidth
              autoComplete="off"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={clearTicket}>Clear ticket</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TicketDialog;
