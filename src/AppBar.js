import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router v6
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from './context/AuthProvider'; // Assuming the path to your AuthProvider is correct

export default function ButtonAppBar({ title }) {
  const { auth, setAuth } = useAuth(); // Get auth object and setAuth function
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    setAuth({ user: null, userType: null }); // Clear the authentication data
    navigate('/', { replace: true }); // Navigate to the root, replacing the current entry in the history stack
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" textAlign="left" component="div" sx={{ flexGrow: 2 }}>
            {title} {/* Use the passed title prop here */}
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginRight: '20px' }}>
            Hello {auth.user || 'Guest'}! {/* Display the username from context */}
          </Typography>
          <Button 
            color="inherit" onClick={handleLogout}
            sx={{
              border: '1px solid white', // Styling the button with a white border
              '&:hover': {
                border: '1px solid rgba(255, 255, 255, 0.5)', // Lighter border on hover
              }
            }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
