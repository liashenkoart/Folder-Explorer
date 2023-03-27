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
  TextField,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FolderIcon from '@mui/icons-material/Folder';
import { Data, Order } from "../types/table";
import { EnhancedTableHead } from "../components/EnhancedTableHead/EnhancedTableHead";
import { EnhancedTableToolbar } from "../components/EnhancedTableToolbar/EnhancedTableToolbar";
import { getComparator } from "../utils/descendingComparator";
import { stableSort } from "../utils/stableSort";
import { formatBytes } from "../utils/formatBytes";
import { formatDate } from "../utils/formatDate";
import { useEffect } from "react";
import { FilesAPI } from "../api/files";
import { useRouter } from "next/router";

//  assets
import styles from "../styles/files.module.scss"

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
  const { path_id } = router.query;

  const [rows, setRows] = React.useState([initialRor]);
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

  useEffect(() => {
    if (path_id) {
      if (typeof path_id !== "string") {
        FilesAPI.getByPath(path_id.join('/')).then(({ data }) => {
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
      <main>
        <Container>
          <Box py={4}>
            <Paper>
              <EnhancedTableToolbar numSelected={selected.length} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: "center",
                  pl: 2,
                  pr: 2,
                  py: 1
                }}>
                <Link href={router.asPath.split("/").slice(0, router.asPath.split("/").length - 1).join('/')}
                      legacyBehavior>
                  <a className={router.asPath.split("/").length <= 2 ? styles.disabled : ''}>
                    <Box display="flex" alignItems="center" width={"24px"}>
                      <Box width="12px" minWidth="12px" mr={1}>
                        <img src={'./arrow.svg'} alt='' />
                      </Box>
                      <Typography>
                        Back
                      </Typography>
                    </Box>
                  </a>
                </Link>
                <Box flex="auto" maxWidth="500px" ml={2}>
                  <TextField size="small" fullWidth label="Search..." type="search" />
                </Box>
              </Box>
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
                    <Typography variant="h6" textAlign="center">
                      <h4>Empty Folder</h4>
                    </Typography>
                  </Box>}
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
