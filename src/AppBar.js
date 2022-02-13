import * as React from "react";
import Axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["NORMAL", "OXYGEN", "ICU", "VENTILATOR"];

const ResponsiveAppBar = ({
  lat,
  lng,
  updateRes,
  updateStatus,
  updateType,
}) => {
  const fetchResults = async (type) => {
    if (!lat || !lng) return;
    updateRes([]);
    updateType(type);
    updateStatus("Loading...");
    const res = await Axios.post("http://localhost:5000/hospiSorted", {
      origin: `${lat},${lng}`,
      type,
    });
    updateRes(res.data.data);
    updateStatus(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            CovHelp
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, color: "black" }}
          >
            Search nearest hospital beds
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justify: "center",
              marginLeft: 50,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                variant="contained"
                color="secondary"
                size="medium"
                onClick={() => fetchResults(page)}
                sx={{
                  my: 3,
                  color: "white",
                  display: "flex",
                  marginLeft: 2,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
