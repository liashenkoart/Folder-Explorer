import * as React from "react";

// libs
import { Box, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

//  styles
import styles from "../../styles/files.module.scss";
import { FC, useEffect, useState } from "react";

interface IBackAndSearch {
  setFilteredRows: (value: any) => void,
  rows: any,
}

export const BackAndSearch: FC<IBackAndSearch> = ({ setFilteredRows, rows }) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const filteredRows: any = rows.filter((row: any) => row.name.includes(searchValue));
    setFilteredRows(filteredRows);
  }, [searchValue, rows, setFilteredRows])

  return (
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
        <a className={cn(styles.back, { [styles.disabled]: router.asPath.split("/").length <= 2 })}>
          <Box display="flex" alignItems="center">
            <ArrowBackIcon fontSize="small" />
            <Typography>
              Back
            </Typography>
          </Box>
        </a>
      </Link>
      <Box flex="auto" maxWidth="500px" ml={2}>
        <TextField
          size="small"
          fullWidth label="Search..."
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} />
      </Box>
    </Box>
  );
}
