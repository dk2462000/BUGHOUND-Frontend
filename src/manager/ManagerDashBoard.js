import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from './AppBar';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import * as XLSX from 'xlsx';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [bugs, setBugs] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

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

    const enumFields = {
        reportType: ['CODING_ERROR', 'DESIGN_ISSUE', 'SUGGESTION', 'DOCUMENTATION', 'HARDWARE', 'QUERY'],
        severity: ['MINOR', 'SERIOUS', 'FATAL'],
        status: ['OPEN', 'RESOLVED', 'CLOSED'],
        priority: ['FIX_IMMEDIATELY', 'FIX_AS_SOON_AS_POSSIBLE', 'FIX_BEFORE_NEXT_MILESTONE', 'FIX_BEFORE_RELEASE', 'FIX_IF_POSSIBLE', 'OPTIONAL'],
        resolution: ['PENDING', 'FIXED', 'CANNOT_BE_REPRODUCED', 'DEFERRED', 'AS_DESIGNED', 'WITHDRAWN_BY_REPORTER', 'NEED_MORE_INFO', 'DISAGREE_WITH_SUGGESTION', 'DUPLICATE']
    };

    const fieldDisplayNameMapping = {
        bug_id: 'Bug ID',
        buggyProgram: 'Program',
        reportType: 'Report Type',
        severity: 'Severity',
        reportedBy: 'Reported By',
        reportDate: 'Report Date',
        functionalArea: 'Functional Area',
        assignedTo: 'Assigned To',
        status: 'Status',
        priority: 'Priority',
        resolution: 'Resolution',
        resolvedBy: 'Resolved By'
    };

    const exportToExcel = (apiData, fileName) => {
        const transformedData = apiData.map(data => {
            return {
                ...data,
                comments: data.comments.map(comment => `Time: ${comment.commentTime}, Comment: ${comment.comment}`).join('; '),
                attachments: data.attachments.map(attachment => `ID: ${attachment.attachmentId}, Data: ${attachment.attachment}`).join('; ')
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bugs");    
        // Download
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:8080/bugs');
            setBugs(result.data);
        };
        fetchData();
    }, []);

    const viewBugDetails = (bugId) => {
        navigate(`/managerbugdetails/${bugId}`);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setSearchTerm(""); // Reset search term when changing filter
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBugs = filter ? bugs.filter(bug => {
        const value = bug[filter];
        return value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
    }) : bugs;

    return (
        <div>
            <AppBar title="Manager Dashboard" />
            <div style={dashboardStyle}>
            <button style={buttonStyle} onClick={() => navigate('/create-bug')}>Create Bug</button>
            <button style={buttonStyle} onClick={() => navigate('/manage-program')}>Manage Program</button>
            <button style={buttonStyle} onClick={() => navigate('/manage-function')}>Manage Function</button>
            <button style={buttonStyle} onClick={() => navigate('/manage-user')}>User Management</button>
            </div>
            <Typography variant="h4" textAlign="auto" component="div" sx={{ flexGrow: 2 }}>
            Bug Report
            </Typography>
            <button onClick={() => exportToExcel(filteredBugs, 'Bug_Report')} style={buttonStyle}>
            Export to Excel
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <TableContainer component={Paper} style={{ margin: '20px', maxWidth: '95%', maxHeight: 500, border: "3px solid rgb(0, 0, 0)"}}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
                    <TextField
                    select
                    label="Filter by"
                    value={filter}
                    onChange={handleFilterChange}
                    helperText="Select the column to filter"
                    variant="outlined"
                    style={{ margin: '10px', width: '200px' }}
                    >
                    <MenuItem value="">None</MenuItem>
                    {Object.entries(fieldDisplayNameMapping).map(([key, value]) => (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                    ))}
                    </TextField>
                    {filter && enumFields[filter] ? (
                        <TextField
                            select
                            label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            variant="outlined"
                            style={{ margin: '10px', width: '200px' }}
                        >
                            <MenuItem value="">-</MenuItem>
                            {enumFields[filter].map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </TextField>
                    ) : (
                        <TextField
                            label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            variant="outlined"
                            style={{ margin: '10px', width: '200px' }}
                            disabled={!filter}
                        />
                    )}
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{background: "#4fade4", fontWeight:"bold"}}>
                        <TableRow>
                            {['Bug ID', 'Program', 'Type', 'Severity', 'Reported By', 'Date', 'Area', 'Assigned To', 'Status', 'Priority', 'Resolution', 'Resolved By'].map(header => (
                                <TableCell key={header}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredBugs.map((bug) => (
                        <TableRow key={bug.bug_id}>
                        <TableCell component="th" scope="row">
                            <a href="#" onClick={(e) => {e.preventDefault(); viewBugDetails(bug.bug_id);}}>{bug.bug_id}</a>
                        </TableCell>
                        <TableCell>{bug.buggyProgram || '-'}</TableCell>
                        <TableCell>{bug.reportType || '-'}</TableCell>
                        <TableCell>{bug.severity || '-'}</TableCell>
                        <TableCell>{bug.reportedBy || '-'}</TableCell>
                        <TableCell>{bug.reportDate || '-'}</TableCell>
                        <TableCell>{bug.functionalArea || '-'}</TableCell>
                        <TableCell>{bug.assignedTo || '-'}</TableCell>
                        <TableCell>{bug.status || '-'}</TableCell>
                        <TableCell>{bug.priority || '-'}</TableCell>
                        <TableCell>{bug.resolution || '-'}</TableCell>
                        <TableCell>{bug.resolvedBy || '-'}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
    );
};

export default ManagerDashboard;
