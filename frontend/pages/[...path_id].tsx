import * as React from 'react';

// libs
import Head from 'next/head'
import Link from "next/link";

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
  Typography,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FolderIcon from '@mui/icons-material/Folder';
import { Data, Order } from "../types/table";
import { EnhancedTableHead, EnhancedTableToolbar, BackAndSearch, CreateFile } from "../components";
import { getComparator } from "../utils/descendingComparator";
import { stableSort } from "../utils/stableSort";
import { formatBytes } from "../utils/formatBytes";
import { formatDate } from "../utils/formatDate";
import { useEffect } from "react";
import { FilesAPI } from "../api/files";
import { useRouter } from "next/router";

const initialRor = {
  "path": "",
  "name": "",
  "size": 0,
  "type": "",
  "counts": 0,
  "last_modified": ""
}

interface IRow {
  "path": string,
  "name": string,
  "size": number,
  "type": string,
  "children": [],
  "mtime": string
}

export default function Files() {
  const router = useRouter();
  const { path_id }: any = router.query;

  const [rows, setRows] = React.useState([initialRor]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(true);

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

  const getFilesByPath = (path: string[]) => {
    FilesAPI.getByPath(path.join('/')).then(({ data }) => {
      const newData: any = []
      if (data.children) {
        data.children.map((row: IRow) => {
          newData.push({
            "path": row.path,
            "name": row.name,
            "size": row.size,
            "type": row.type,
            "counts": row.children ? row.children.length : 0,
            "last_modified": row.mtime
          })
        })
      }
      setRows(newData)
    })
  }

  useEffect(() => {
    if (path_id) {
      if (typeof path_id !== "string") {
        getFilesByPath(path_id);
      }
    }

    // FilesAPI.createNewFile({
    //   "directory": "test_folder/d1",
    //   "name": "string22",
    //   "extension": "txt"
    // }).then(({ data }) => {
    //   // setRows(data)
    // })
    // FilesAPI.createNewDirectory({
    //   "directory": "test_folder/d1/test22",
    //   "name": "check",
    // }).then(({ data }) => {
    //   // setRows(data)
    // })
    // FilesAPI.getByPath("test_folder/d1").then(({ data }) => {
    // console.log(data, 'data2')
    // setRows(data)
    // })

  }, [path_id]);

  return (
    <>
      <Head>
        <title>File & Directory Browsing</title>
        <meta name="description" content="File & Directory Browsing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateFile getFilesByPath={getFilesByPath} path_id={path_id} open={open} setOpen={setOpen} />
      <main>
        <Container>
          <Box py={4}>
            <Paper>
              <EnhancedTableToolbar numSelected={selected.length} />
              <BackAndSearch />
              <TableContainer>
                {rows.length > 0
                  ? <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
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
                          <TableCell id={labelId} padding="none">
                            <Box display="flex" alignItems="center" gap={1}>
                              {row.type === "directory"
                                ? <>
                                  <Link href={row.path} legacyBehavior>
                                    <a>
                                      <Box display="flex" alignItems="center" gap={1}>
                                        <FolderIcon fontSize="small" />
                                        {row.name}
                                      </Box>
                                    </a>
                                  </Link>
                                </>
                                : <>
                                  <FileCopyIcon fontSize="small" />
                                  {row.name}
                                </>}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{formatBytes(row.size)}</TableCell>
                          <TableCell align="right">{row.counts}</TableCell>
                          <TableCell align="right">{formatDate(row.last_modified)}</TableCell>
                        </TableRow>)
                      })}
                    </TableBody>
                  </Table>
                  : <Box p={2}>
                    <Typography variant="h6" textAlign="center">Empty Folder</Typography>
                  </Box>}
              </TableContainer>
            </Paper>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => setOpen(true)}>
              Create file
            </Button>
            <Button variant="outlined" startIcon={<FileDownloadIcon />}>
              Create directory
            </Button>
          </Box>
        </Container>
      </main>
    </>
  )
}
