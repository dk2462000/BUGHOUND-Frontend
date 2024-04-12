import * as React from 'react';
// import { useHistory } from 'react-router-dom'; // Import useHistory hook from React Router
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Accept title as a prop
export default function ButtonAppBar({ title }) {
//   const history = useHistory(); // Hook for navigation

  const handleLogout = () => {
    // Logic to handle logout here...
    // history.push('/display'); // Navigate to the route for DisplayProgram
  };

  // Placeholder for the global username, adjust the implementation as needed
  const username = "aravinda"; // This will be replaced with the global username variable in the future

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" textAlign="left" component="div" sx={{ flexGrow: 2 }}>
            {title} {/* Use the passed title prop here */}
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginRight: '20px' }}>
            Hello {username}! {/* Display the username */}
          </Typography>
          <Button 
            color="inherit" onClick={handleLogout} 
            sx={{
            border: '1px solid white', // Example: 1px solid border in white
            '&:hover': {
            border: '1px solid rgba(255, 255, 255, 0.5)', // Optional: Change on hover
    }
  }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
