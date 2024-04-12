import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AppBar from './AppBar'; 

function UserOperation() {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar title="User Management" /> 
      <div style={{
        textAlign: 'center', 
        marginTop: '50px',
        display: 'flex',       // Use flexbox
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center'    // Align children centrally
      }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/create-user')}
          style={{ marginBottom: '20px' }} // Add space between the buttons
        >
          Create New User
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/manage-users')}
        >
          Manage Existing Users
        </Button>
      </div>
    </div>
  );
}

export default UserOperation;
