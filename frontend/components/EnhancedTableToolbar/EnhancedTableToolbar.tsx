import * as React from "react";

// libs
import { Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

// components
import { FilesAPI } from "../../api/files";
import { Notification } from "../Notification/Notification";


interface EnhancedTableToolbarProps {
  rows: any;
  numSelected: number;
  selected: readonly string[];
  getFilesByPath: (value: string[]) => void,
  path_id: string[];
  setSelected: (value: readonly string[]) => void;
  setOpenRename: (value: boolean) => void;
}

export const EnhancedTableToolbar = (
  {
    selected,
    setSelected,
    numSelected,
    path_id,
    getFilesByPath,
    rows,
    setOpenRename
  }: EnhancedTableToolbarProps) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = (name: readonly string[]) => {
    const current = rows.filter((row: any) => row.name === name[0]);
    FilesAPI.delete(current[0].type, current[0].path)
      .then(() => {
        setSelected([]);
        getFilesByPath(path_id);
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000)
      })
  }

  return (
    <>
      {errorMessage && <Notification errorMessage={errorMessage} />}
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}>
        {numSelected > 0 ?
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
          : <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            File & Directory Browsing
          </Typography>}
        {numSelected === 1
          ? <Box display="flex" alignItems="center">
            <Tooltip title="Edit" onClick={() => setOpenRename(true)}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" onClick={() => onDelete(selected)}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          : null}
      </Toolbar>
    </>
  );
}
