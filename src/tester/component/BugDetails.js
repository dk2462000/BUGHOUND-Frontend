import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, CircularProgress, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.action.hover,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DetailTableContainer = styled(TableContainer)({
  marginTop: '20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const TesterBugDetails = () => {
  const { bugId } = useParams();
  const [editDetails, setEditDetails] = useState({});
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/bugs/${bugId}`)
      .then(response => response.json())
      .then(data => {
        setEditDetails(data);
      })
      .catch(error => console.error("Error fetching bug details: ", error));

    fetch("http://localhost:8080/programs")
      .then(response => response.json())
      .then(setPrograms)
      .catch(error => console.error("Error fetching programs: ", error));
  }, [bugId]);

  const goToDashboard = () => {
    navigate('/TesterDashboard');
  };

  if (!editDetails) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  const entries = Object.entries(editDetails).filter(([key]) => !['comments', 'newComment', 'attachments'].includes(key));

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        View Bug Details (ID: {bugId})
      </Typography>
      <DetailTableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {entries.map(([key, value]) => (
              <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </StyledTableCell>
                <TableCell>
                  {typeof value === 'boolean' ? value ? 'Yes' : 'No' : value}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </DetailTableContainer>
      <Typography variant="h6" gutterBottom mt={2}>Comments</Typography>
      <DetailTableContainer component={Paper}>
        <Table aria-label="comments table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date and Time</StyledTableCell>
              <StyledTableCell>Comment</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editDetails.comments && editDetails.comments.map((comment, index) => (
              <StyledTableRow key={index}>
                <TableCell>
                  {comment.commentTime ? new Date(comment.commentTime).toLocaleString() : "Recent"}
                </TableCell>
                <TableCell>{comment.comment}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </DetailTableContainer>
      <Button onClick={goToDashboard} variant="contained" color="primary" sx={{ mt: 2 }}>
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default TesterBugDetails;
