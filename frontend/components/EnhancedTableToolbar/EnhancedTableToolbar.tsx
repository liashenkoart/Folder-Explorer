import * as React from "react";

// libs
import { Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


interface EnhancedTableToolbarProps {
  numSelected: number;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
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
      {numSelected > 0
        ? <Box display="flex" alignItems="center">
          {numSelected === 1 && <Tooltip title="Delete">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>}
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
        : null}
    </Toolbar>
  );
}
