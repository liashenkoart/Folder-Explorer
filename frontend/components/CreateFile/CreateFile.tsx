import React, { FC, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Snackbar,
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from "yup";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// components
import { FilesAPI } from "../../api/files";

interface ICreateFile {
  setOpen: (value: boolean) => void,
  getFilesByPath: (value: string[]) => void,
  open: boolean;
  path_id: string[];
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  extension: yup.string().required('Extension is required'),
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const CreateFile: FC<ICreateFile> = ({ getFilesByPath, path_id, setOpen, open }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: { name: '', extension: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      FilesAPI.createNewFile({
        "directory": path_id.join('/'),
        "name": values.name,
        "extension": values.extension,
      }).then(() => {
        setOpen(false);
        getFilesByPath(path_id);
      }).catch(({ response }) => {
        setErrorMessage(response.data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000)
      })
    },
  });

  return (
    <>
      {errorMessage && <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>}
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
        <Box mb={2}>
          <DialogTitle>Create New File</DialogTitle>
        </Box>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box mb={4}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
            <Box mb={4}>
              <TextField
                fullWidth
                name="extension"
                label="Extension"
                type="text"
                value={formik.values.extension}
                onChange={formik.handleChange}
                error={formik.touched.extension && Boolean(formik.errors.extension)}
                helperText={formik.touched.extension && formik.errors.extension}
              />
            </Box>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                fullWidth type="submit"
                onClick={() => setOpen(false)}>
                Chancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                fullWidth type="submit">
                Confirm
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}