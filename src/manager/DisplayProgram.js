import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';

const columns = [
  { field: 'name', headerName: 'Program Name', width: 150 },
  { field: 'version', headerName: 'Program Version', width: 150 },
];

export default function DisplayProgram({ programList, fetchPrograms }) {
    const [selectionModel, setSelectionModel] = useState([]);
    const handleDelete = async () => {
        // Call the delete API for each selected program
        const deletePromises = selectionModel.map((id) => {
          const program = programList.find(p => p.id === id);
          return fetch(`http://localhost:8080/programs/remove/${program.name}/${program.version}`, {
            method: 'DELETE',
          });
        });
    
        try {
            await Promise.all(deletePromises);
            fetchPrograms(); // Refresh the program list after successful deletion
            setSelectionModel([]); // Clear the selection model
          } catch (error) {
            console.error('Failed to delete:', error);
          }
      };
    
  return (
    <div style={{ height: 300, width: '60%', margin: "auto", marginTop: '30px', marginBottom: '50px' }}>
      <Typography variant="h4" component="h1" textAlign="center" sx={{ width: '100%' }}>
        Program List
      </Typography>
      <DataGrid
        rows={programList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => {
          console.log(newSelectionModel); // Now using onRowSelectionModelChange
          setSelectionModel(newSelectionModel);
        }}
        rowSelectionModel={selectionModel}
      />
      <Typography variant="overline" component="h1" textAlign="center" sx={{ width: '100%' }}>
        Select Program(s) to delete
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        disabled={selectionModel.length === 0}
        style={{ marginTop:'10px', marginBottom: '10px' }}
      >
        Delete Selected Program(s)
      </Button>
    </div>
  );
}
