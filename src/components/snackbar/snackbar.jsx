import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { eventBus } from '../../services/event-bus';

const statusSnackBar = {
  success: 'success',
  error: 'error',
};

export default function SimpleSnackbar() {
  const [msg, setMsg] = useState(null);
  const [open, setOpen] = useState(false);
  const [colorSnackBar, setColorSnackBar] = useState(statusSnackBar.success);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      handleClose(null, 'clickaway');
    }, 4000);
  };

  const handleClose = (__, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    eventBus.on('success', (data) => {
      setMsg(data.message);
      setColorSnackBar(statusSnackBar.success);
      handleOpen();
    });
    eventBus.on('error', (data) => {
      setMsg(data.message);
      setColorSnackBar(statusSnackBar.error);
      handleOpen();
    });
    return () => {
      eventBus.remove('error', () => {
        setMsg(null);
        handleClose(null, 'clickaway');
      });
      eventBus.remove('success', () => {
        setMsg(null);
        handleClose(null, 'clickaway');
      });
    };
  });

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={colorSnackBar}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
