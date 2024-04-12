import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';

const columns = [
  { field: 'funcName', headerName: 'Function Areas', width: 200 }
];

export default function DisplayFunction({ functionList, fetchFunctions }) {
    const [selectionModel, setSelectionModel] = useState([]);

    const handleDelete = async () => {
        const deletePromises = selectionModel.map((id) => {
          const func = functionList.find(f => f.id === id);
          return fetch(`http://localhost:8080/functions/remove/${func.funcName}`, {
            method: 'DELETE',
          });
        });

        try {
            await Promise.all(deletePromises);
            fetchFunctions(); // Refresh the function list after successful deletion
            setSelectionModel([]); // Clear the selection model
          } catch (error) {
            console.error('Failed to delete:', error);
          }
      };

  return (
    <div style={{ height: 300, width: '60%', margin: "auto", marginTop: '30px', marginBottom: '50px' }}>
      <Typography variant="h4" component="h1" textAlign="center" sx={{ width: '100%' }}>
        Function List
      </Typography>
      <DataGrid
        rows={functionList}
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
        Select function area(s) to delete
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        disabled={selectionModel.length === 0}
        style={{ marginTop: '10px' }}
      >
        Delete Selected Function(s)
      </Button>
    </div>
  );
}
