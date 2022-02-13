import React, { useState, useEffect } from "react";
import Alert from "./Alert";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { padding } from "@mui/system";

const Hospital = ({ id, name, time, dist, link, type }) => {
  const [status, setStatus] = useState(false);
  const setButton = () => {
    setStatus(!status);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "center" },
        m: 3,
        // minWidth: { md: 550 },
        width: 500,
        bgcolor: "#4dabf5",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
        paddingTop: 5,
        paddingBottom: 0,
        marginLeft: 75,
      }}
    >
      <Chip label={`${type} Bed`} sx={{ marginBottom: 2, color: "white" }} />
      <Card variant="outlined" sx={{ width: 500, color: "#618833" }}>
        <CardContent>
          <Stack spacing={1}>
            <Chip label={name} />
            <Chip label={`${time} Hr`} />
            <Chip label={`${dist} Km`} />
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setButton()} variant="contained">
            Set Alert
          </Button>
          {/* <Button size="small">Learn More</Button> */}
          <Link sx={{ marginLeft: 39 }} href={link}>
            More Info
          </Link>
        </CardActions>

        {status && <Alert id={id} sett={setButton} type={type} />}
      </Card>
    </Box>
  );
};
export default Hospital;
