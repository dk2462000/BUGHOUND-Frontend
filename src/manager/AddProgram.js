import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function AddProgram({ onAddProgram }) {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');

  const programObject = {
    program: name,
    version: version
  };

  function submitInfo(e) {
    e.preventDefault();
    fetch("http://localhost:8080/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(programObject)
    })
    .then(response => {
      if (response.ok) {
        onAddProgram(); // Call the function passed via props to refresh the list
      }
      return response.json();
    })
    .then(sus => console.log(sus))
    .catch(e => console.log(e))
  }

  const isFormFilled = name.trim() !== '' && version.trim() !== '';

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 0.5},
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h1" textAlign="center" sx={{ width: '100%' }}>
        Add Programs
      </Typography>
      <Box sx={{ display: 'flex', width: '50%', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ mr: 2 }}>
          Program Name:
        </Typography>
        <TextField 
          label="program_name" 
          variant="outlined" 
          sx={{ flexGrow: 1 }} 
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box sx={{ display: 'flex', width: '50%', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Program Version:
        </Typography>
        <TextField 
          label="program_version" 
          variant="outlined" 
          sx={{ flexGrow: 1 }} 
          onChange={(e) => setVersion(e.target.value)}
        />
      </Box>
      <Typography variant="caption" sx={{ mr: 0.1 }}>
        Ex Version: 1.0.11
      </Typography>
      <Button 
        onClick={submitInfo} 
        variant="contained" 
        disabled={!isFormFilled}  // Button is disabled unless both fields are filled
      >
        Add Program
      </Button>
    </Box>
  );
}
