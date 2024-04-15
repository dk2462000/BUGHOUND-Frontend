import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import AppBar from '../AppBar';

function UserOperation() {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate('/ManagerDashboard', { replace: true }); // Navigates back to Manage Users
    };
    
    return (
        <div>
            <AppBar title="User Management" />
            <button style={{ marginLeft: "20px" }} type="button" className="btn-submit" onClick={handleBack}>Back</button>
            <TableContainer component={Paper} style={{ maxWidth: 650, margin: '50px auto', padding: '20px' }}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell style={{fontWeight: "bold"}}component="th" scope="row">
                                To Create a New User
                            </TableCell>
                            <TableCell align="auto">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => navigate('/create-user')}
                                >
                                    Create New User
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: "bold"}} component="th" scope="row">
                                To Manage Existing Users
                            </TableCell>
                            <TableCell align="auto">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => navigate('/manage-users')}
                                >
                                    Manage Existing Users
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UserOperation;
