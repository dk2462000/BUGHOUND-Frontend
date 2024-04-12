import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import AppBar from './AppBar'; 

export default function ManageUser() {
  const [userList, setUserList] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch("http://localhost:8080/user/details")
      .then(res => res.json())
      .then(data => {
        setUserList(data.map((user, index) => ({ ...user, id: index }))); // Assume each user needs a unique id for DataGrid
      })
      .catch(e => console.error(e));
  }, []);

  const handleDelete = async () => {
    const deletePromises = selectionModel.map(id => {
      const user = userList.find(u => u.id === id);
      return fetch(`http://localhost:8080/user/remove/${user.username}`, { method: 'DELETE' });
    });

    try {
      await Promise.all(deletePromises);
      setUserList(userList.filter(user => !selectionModel.includes(user.id))); // Update the list in state
      setSelectionModel([]);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const columns = [
    { field: 'username', headerName: 'Username', width: 150, renderCell: (params) => (
        <Button color="primary" onClick={() => navigate(`/edit-user/${params.value}`)}>
          {params.value}
        </Button>
      )},
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'emailId', headerName: 'Email', width: 200 },
    { field: 'userType', headerName: 'User Type', width: 120 },
  ];

  return (
    <div>
      <AppBar title="Users Management" /> 
        <div style={{ height: 400, width: '100%', margin: 'auto' }}>
      <DataGrid
        rows={userList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={setSelectionModel}
        rowSelectionModel={selectionModel}
      />
      <Typography variant="overline" component="h1" sx={{ width: '100%' }}>
        Select Program(s) to delete
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        disabled={selectionModel.length === 0}
        sx={{ m: 2 }}
      >        
        Delete Selected User(s)
      </Button>
    </div>
    </div>
    
  );
}


