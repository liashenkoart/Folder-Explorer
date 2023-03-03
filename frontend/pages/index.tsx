import * as React from 'react';

// libs
import Head from 'next/head'

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Container } from "@mui/material";

interface Data {
  size: number;
  name: string;
}

const rows = [
  {
    "path": "files1",
    "name": "files1",
    "children": [
      {
        "path": "files/.DS_Store",
        "name": ".DS_Store",
        "mtime": "2022-11-30T17:16:29.447Z",
        "size": 6148
      },
      {
        "path": "files/check.json",
        "name": "check.json",
        "mtime": "2022-11-30T16:40:03.497Z",
        "size": 0
      },
      {
        "path": "files/folder",
        "name": "folder",
        "children": [
          {
            "path": "files/folder/Screenshot 2022-11-28 at 20.44.42.png",
            "name": "Screenshot 2022-11-28 at 20.44.42.png",
            "mtime": "2022-11-30T17:16:29.215Z",
            "size": 274850
          },
          {
            "path": "files/folder/check2.json",
            "name": "check2.json",
            "mtime": "2022-11-30T17:01:05.388Z",
            "size": 0
          },
          {
            "path": "files/folder/folder.json",
            "name": "folder.json",
            "mtime": "2022-11-30T17:16:23.945Z",
            "size": 0
          }
        ],
        "mtime": "2022-11-30T17:16:29.214Z",
        "size": 274850
      }
    ],
    "mtime": "2022-11-30T17:13:14.624Z",
    "size": 280998
  },
  {
    "path": "files2",
    "name": "files2",
    "children": [
      {
        "path": "files/.DS_Store",
        "name": ".DS_Store",
        "mtime": "2022-11-30T17:16:29.447Z",
        "size": 6148
      },
      {
        "path": "files/check.json",
        "name": "check.json",
        "mtime": "2022-11-30T16:40:03.497Z",
        "size": 0
      },
      {
        "path": "files/folder",
        "name": "folder",
        "children": [
          {
            "path": "files/folder/Screenshot 2022-11-28 at 20.44.42.png",
            "name": "Screenshot 2022-11-28 at 20.44.42.png",
            "mtime": "2022-11-30T17:16:29.215Z",
            "size": 274850
          },
          {
            "path": "files/folder/check2.json",
            "name": "check2.json",
            "mtime": "2022-11-30T17:01:05.388Z",
            "size": 0
          },
          {
            "path": "files/folder/folder.json",
            "name": "folder.json",
            "mtime": "2022-11-30T17:16:23.945Z",
            "size": 0
          }
        ],
        "mtime": "2022-11-30T17:16:29.214Z",
        "size": 274850
      }
    ],
    "mtime": "2022-11-30T17:13:14.624Z",
    "size": 280998
  },
  {
    "path": "files3",
    "name": "files3",
    "children": [
      {
        "path": "files/.DS_Store",
        "name": ".DS_Store",
        "mtime": "2022-11-30T17:16:29.447Z",
        "size": 6148
      },
      {
        "path": "files/check.json",
        "name": "check.json",
        "mtime": "2022-11-30T16:40:03.497Z",
        "size": 0
      },
      {
        "path": "files/folder",
        "name": "folder",
        "children": [
          {
            "path": "files/folder/Screenshot 2022-11-28 at 20.44.42.png",
            "name": "Screenshot 2022-11-28 at 20.44.42.png",
            "mtime": "2022-11-30T17:16:29.215Z",
            "size": 274850
          },
          {
            "path": "files/folder/check2.json",
            "name": "check2.json",
            "mtime": "2022-11-30T17:01:05.388Z",
            "size": 0
          },
          {
            "path": "files/folder/folder.json",
            "name": "folder.json",
            "mtime": "2022-11-30T17:16:23.945Z",
            "size": 0
          }
        ],
        "mtime": "2022-11-30T17:16:29.214Z",
        "size": 274850
      }
    ],
    "mtime": "2022-11-30T17:13:14.624Z",
    "size": 280998
  }
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'File',
  },
  {
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Size',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick} />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
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
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} selected
        </Typography>
        : <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div">
          File & Directory Browsing Single Page App
        </Typography>}
      {numSelected > 0
        ? <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        : <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>}
    </Toolbar>
  );
}

export default function Home() {

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data,) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Box py={4}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}>
                            <TableCell padding="checkbox">
                              <Checkbox color="primary" checked={isItemSelected} />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">{row.name}
                            </TableCell>
                            <TableCell align="right">{row.size}</TableCell>
                          </TableRow>)
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Container>
      </main>
    </>
  )
}
