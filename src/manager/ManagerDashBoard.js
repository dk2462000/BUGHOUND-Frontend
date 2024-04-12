import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from './AppBar';

const ManagerDashboard = () => {
    const navigate = useNavigate();

    // State to store the list of bugs
    const [bugSummaries, setBugSummaries] = useState([]);

    // Define some inline styles
    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // Green background
        color: 'white',
        border: 'none',
        borderRadius: '5px'
    };

    const dashboardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
    };

    const tableStyle = {
        margin: '20px',
        borderCollapse: 'collapse',
        width: '80%'
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2'
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px'
    };

    useEffect(() => {
        fetch('http://localhost:8080/bugs/summaries')
            .then(response => response.json())
            .then(data => setBugSummaries(data))
            .catch(error => console.error('Error fetching bug summaries:', error));
    }, []);

    const viewBugDetails = (bugId) => {
        navigate(`/managerbugdetails/${bugId}`);
    };

    return (
        <div>
            <AppBar title="Manager Dashboard" />
            <div style={dashboardStyle}>
                <button style={buttonStyle} onClick={() => navigate('/createbug')}>Create Bug</button>
                <button style={buttonStyle} onClick={() => navigate('/manage-program')}>Manage Program</button>
                <button style={buttonStyle} onClick={() => navigate('/manage-function')}>Manage Function</button>
                <button style={buttonStyle} onClick={() => navigate('/manage-user')}>User Management</button>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Bug ID</th>
                            <th style={thStyle}>Buggy Program</th>
                            <th style={thStyle}>Version</th>
                            <th style={thStyle}>Problem Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugSummaries.map(bug => (
                            <tr key={bug.bugId}>
                                <td style={tdStyle} onClick={() => viewBugDetails(bug.bugId)}>
                                    <a style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                        {bug.bugId}
                                    </a>
                                </td>
                                <td style={tdStyle}>{bug.buggyProgram}</td>
                                <td style={tdStyle}>{bug.buggyProgramVersion}</td>
                                <td style={tdStyle}>{bug.problemSummary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerDashboard;
