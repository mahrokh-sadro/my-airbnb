"use client";

import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: any;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionText?: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionText,
}) => {
  const [open, setOpen] = useState(isOpen);
  console.log("isOpen in modal111", isOpen);

  useEffect(() => {
    console.log("isOpen in modal222", isOpen);
    setOpen(isOpen);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
    handleClose();
  }, [disabled, onSubmit]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}{" "}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom></Typography>
          <Typography gutterBottom></Typography>
          <Typography gutterBottom>{body}</Typography>
        </DialogContent>
        <DialogActions>
          {secondaryAction && secondaryActionText && (
            <Button onClick={handleSecondaryAction}>secondary</Button>
          )}
          <Button autoFocus onClick={handleSubmit}>
            {actionLabel}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default Modal;
