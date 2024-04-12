import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function AddFunction({ onAddFunction }) {
  const [funcName, setFuncName] = useState('');

  const submitInfo = (e) => {
    e.preventDefault();
    const functionObject = {
      funcName: funcName.trim() // Ensure no whitespace-only submission
    };

    if (!functionObject.funcName) return; // Prevent submitting empty or whitespace names

    fetch("http://localhost:8080/functions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(functionObject)
    })
    .then(response => {
      if (response.ok) {
        onAddFunction(); // Refresh the list if the POST was successful
        setFuncName(''); // Optionally clear the input on success
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(e => console.log(e));
  };

  // Check if the function name is not empty and not just whitespace
  const isFormFilled = funcName.trim() !== '';

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 0.5 },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h1" textAlign="center" sx={{ width: '100%' }}>
        Add Function Area
      </Typography>
      <Box sx={{ display: 'flex', width: '50%', alignItems: 'center' }}>
        <TextField
          label="Function Area"
          variant="outlined"
          sx={{ flexGrow: 1 }}
          value={funcName}
          onChange={(e) => setFuncName(e.target.value)}
          required
        />
      </Box>
      <Button
        onClick={submitInfo}
        variant="contained"
        disabled={!isFormFilled} // Enable button only when there is valid input
      >
        Add Function
      </Button>
    </Box>
  );
}
