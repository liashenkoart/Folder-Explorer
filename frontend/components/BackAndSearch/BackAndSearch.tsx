import * as React from "react";

// libs
import { Box, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Link from "next/link";
import { useRouter } from "next/router";

//  styles
import styles from "../../styles/files.module.scss";

export const BackAndSearch = () => {
  const router = useRouter();

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
        <a className={router.asPath.split("/").length <= 2 ? styles.disabled : ''}>
          <Box display="flex" alignItems="center" width={"24px"}>
            <ArrowBackIcon fontSize="small" />
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
  );
}
