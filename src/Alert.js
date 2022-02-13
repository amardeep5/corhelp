import React, { useState, useEffect } from "react";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Alert = ({ id, sett, type }) => {
  const [email, setEmail] = useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await Axios.post("http://localhost:5000/setAlert", {
      email,
      type,
      hospital: id,
    });
    if (res) alert(`${email} ${id} ${type} success`);
    else alert(`${email} ${id} ${type} error`);
    setEmail("");
    sett();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          id="filled-hidden-label-small"
          value={email}
          size="small"
          onChange={handleChange}
          sx={{ marginLeft: 2, marginBottom: 2 }}
        />

        <Button variant="contained" type="submit" sx={{ marginLeft: 5 }}>
          Submit
        </Button>
      </form>
    </div>
  );
};
export default Alert;
