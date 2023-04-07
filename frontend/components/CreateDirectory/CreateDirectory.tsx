import React, { FC, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from "yup";

// components
import { FilesAPI } from "../../api/files";
import { Notification } from "../../components";

interface ICreateFile {
  setOpen: (value: boolean) => void,
  getFilesByPath: (value: string[]) => void,
  open: boolean;
  path_id: string[];
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

export const CreateDirectory: FC<ICreateFile> = ({ getFilesByPath, path_id, setOpen, open }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      FilesAPI.createNewDirectory({
        "directory": path_id.join('/'),
        "name": values.name,
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
      {errorMessage && <Notification errorMessage={errorMessage} />}
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
        <Box mb={2}>
          <DialogTitle>Create New Directory</DialogTitle>
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
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="button"
                onClick={() => setOpen(false)}>
                Chancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit">
                Confirm
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}