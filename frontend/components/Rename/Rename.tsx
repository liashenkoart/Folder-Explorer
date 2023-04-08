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
import { Notification } from "../Notification/Notification";

interface ICreateFile {
  setOpen: (value: boolean) => void,
  getFilesByPath: (value: string[]) => void,
  open: boolean;
  path_id: string[];
  selected: readonly string[];
  setSelected: (value: readonly string[]) => void;
}

const validationSchema = yup.object({
  newName: yup.string().required('Name is required'),
  newExtension: yup.string().required('Extension is required'),
});

export const Rename: FC<ICreateFile> = ({ getFilesByPath, path_id, setOpen, open, selected, setSelected }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: { newName: '', newExtension: '' },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      FilesAPI.rename({
        "directory": path_id.join('/'),
        "oldName": selected[0],
        "newName": `${values.newName}${values.newExtension ? `.${values.newExtension}` : ''}`,
        "rewrite": true
      }).then(() => {
        resetForm();
        setSelected([]);
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
          <DialogTitle>Rename</DialogTitle>
        </Box>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box mb={4}>
              <TextField
                fullWidth
                name="newName"
                label="New Name"
                value={formik.values.newName}
                onChange={formik.handleChange}
                error={formik.touched.newName && Boolean(formik.errors.newName)}
                helperText={formik.touched.newName && formik.errors.newName}
              />
            </Box>
            {selected.length > 0 && selected[0].split(".")[1] ? <Box mb={4}>
              <TextField
                fullWidth
                name="newExtension"
                label="New Extension"
                value={formik.values.newExtension}
                onChange={formik.handleChange}
                error={formik.touched.newExtension && Boolean(formik.errors.newExtension)}
                helperText={formik.touched.newExtension && formik.errors.newExtension}
              />
            </Box> : ''}
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