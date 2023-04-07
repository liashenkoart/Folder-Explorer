import React, { FC } from "react";

// libs
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

interface INotification {
  errorMessage: string
}

export const Notification: FC<INotification> = ({ errorMessage }) => {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}