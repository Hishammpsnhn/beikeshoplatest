import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const CustomAlert = ({ open, handleClose, title, message, onConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          color="primary"
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
