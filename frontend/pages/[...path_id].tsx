import React, { useEffect } from 'react';

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
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FolderIcon from '@mui/icons-material/Folder';
import { useRouter } from "next/router";

//  components
import { FilesAPI } from "../api/files";
import { Rename } from "../components/Rename/Rename";
import { getComparator } from "../utils/descendingComparator";
import { stableSort } from "../utils/stableSort";
import { formatBytes } from "../utils/formatBytes";
import { formatDate } from "../utils/formatDate";
import { Data, Order } from "../types/table";
import { EnhancedTableHead, EnhancedTableToolbar, BackAndSearch, CreateFile, CreateDirectory } from "../components";


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
  const [filteredRows, setFilteredRows] = React.useState([initialRor]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [openFile, setOpenFile] = React.useState(false);
  const [openDirectory, setOpenDirectory] = React.useState(false);
  const [openRename, setOpenRename] = React.useState(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data,) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.name);
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
      setFilteredRows(newData)
    })
  }

  useEffect(() => {
    if (path_id) {
      if (typeof path_id !== "string") {
        getFilesByPath(path_id);
      }
    }

  }, [path_id]);

  return (
    <>
      <Head>
        <title>File & Directory Browsing</title>
        <meta name="description" content="File & Directory Browsing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateFile
        getFilesByPath={getFilesByPath}
        path_id={path_id}
        open={openFile}
        setOpen={setOpenFile} />
      <CreateDirectory
        getFilesByPath={getFilesByPath}
        path_id={path_id}
        open={openDirectory}
        setOpen={setOpenDirectory} />
      <Rename
        getFilesByPath={getFilesByPath}
        path_id={path_id}
        open={openRename}
        setOpen={setOpenRename}
        selected={selected}
        setSelected={setSelected} />
      <main>
        <Container>
          <Box py={4}>
            <Paper>
              <EnhancedTableToolbar
                selected={selected}
                setSelected={setSelected}
                numSelected={selected.length}
                path_id={path_id}
                getFilesByPath={getFilesByPath}
                filteredRows={filteredRows}
                setOpenRename={setOpenRename} />
              <BackAndSearch rows={rows} setFilteredRows={setFilteredRows} />
              <TableContainer>
                {filteredRows.length > 0
                  ? <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={filteredRows.length}
                    />
                    <TableBody>
                      {stableSort(filteredRows, getComparator(order, orderBy)).map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (<TableRow hover key={row.name}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row.name)} />
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
                    <Typography variant="h6" textAlign="center">No folders or files</Typography>
                  </Box>}
              </TableContainer>
            </Paper>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="outlined"
              startIcon={<FileCopyIcon />}
              onClick={() => setOpenFile(true)}>
              Create file
            </Button>
            <Button
              variant="outlined"
              startIcon={<FolderIcon />}
              onClick={() => setOpenDirectory(true)}>
              Create directory
            </Button>
          </Box>
        </Container>
      </main>
    </>
  )
}
