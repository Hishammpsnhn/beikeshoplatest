import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { updateOrdersReturn } from "../../actions/orderActions";

export default function FormDialog({ open, setOpen, orderId,setOrder }) {
  //   const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            const data = await updateOrdersReturn(orderId, {
              orderReturnStatus: "requested",
              reason:email
            });
            if (data) {
              toast.success("Return request sent successfully");
              setOrder(data.updatedOrder);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Return Reason</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your reason for Return and mention your feedback
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Reason"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
