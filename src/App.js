import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import Hospital from "./Hospital";
import Base from "./Base";
import ResponsiveAppBar from "./AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(https://bsmedia.business-standard.com/_media/bs/img/article/2021-04/10/full/1618040757-5126.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const App = () => {
  const classes = useStyles();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const updateResults = (res) => {
    setResults(res);
  };
  const updateType = (typ) => {
    setType(typ);
  };
  const updateStatus = (stat) => {
    setStatus(stat);
  };
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="App" className={classes.root}>
      <ResponsiveAppBar
        lat={lat}
        lng={lng}
        updateRes={updateResults}
        updateType={updateType}
        updateStatus={updateStatus}
      />
      {status && (
        <Box
          spacing={100}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ display: "flex", justify: "center", marginTop: 30 }}
        >
          <CircularProgress thickness="5" />
        </Box>
      )}
      {!results.length && !status && <Base />}
      {results &&
        results.map((result) => {
          return (
            <div>
              <Hospital
                key={result._id}
                id={result._id}
                name={result.name}
                dist={result.dist}
                time={result.time}
                link={result.link}
                type={type}
              />
              <Divider />
            </div>
          );
        })}
    </div>
  );
};

export default App;
