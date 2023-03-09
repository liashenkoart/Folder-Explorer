import * as React from 'react';

// libs
import Head from 'next/head'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Container,
  Button,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Data, Order } from "../types/table";
import { EnhancedTableHead } from "../components/EnhancedTableHead/EnhancedTableHead";
import { EnhancedTableToolbar } from "../components/EnhancedTableToolbar/EnhancedTableToolbar";
import { getComparator } from "../utils/descendingComparator";
import { stableSort } from "../utils/stableSort";


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
            <Paper>
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
                    {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (<TableRow
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
                        <TableCell id={labelId} padding="none">{row.name}
                        </TableCell>
                        <TableCell align="right">{row.size}</TableCell>
                        <TableCell align="right">{row.children.length}</TableCell>
                      </TableRow>)
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          <Box>
            <Button variant="outlined" startIcon={<FileDownloadIcon />}>
              Upload file
            </Button>
          </Box>
        </Container>
      </main>
    </>
  )
}
