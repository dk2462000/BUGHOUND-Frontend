import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  FormControlLabel,
  Checkbox
} from "@mui/material";

const DeveloperBugDetails = () => {
  const { bugId } = useParams();
  const [editDetails, setEditDetails] = useState({});
  const [programs, setPrograms] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/bugs/${bugId}`)
      .then(response => response.json())
      .then(data => setEditDetails({ ...data, newComment: '' }))
      .catch(error => console.error("Error fetching bug details: ", error));

    fetch("http://localhost:8080/programs")
      .then(response => response.json())
      .then(setPrograms)
      .catch(error => console.error("Error fetching programs: ", error));

    fetch("http://localhost:8080/user/developers")
      .then(response => response.json())
      .then(setDevelopers)
      .catch(error => console.error("Error fetching developers: ", error));
  }, [bugId]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEditDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddComment = () => {
    if (editDetails.newComment.trim() !== '') {
      const newComment = {
        comment: editDetails.newComment,
        commentTime: new Date().toISOString()
      };
      const updatedComments = [...(editDetails.comments || []), newComment];
      setEditDetails(prev => ({
        ...prev,
        comments: updatedComments,
        newComment: ''
      }));
      fetch(`http://localhost:8080/bugs/${bugId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: newComment.comment })
      })
      .then(response => response.json())
      .then(() => alert("Comment added successfully!"))
      .catch(error => {
        console.error("Failed to add comment: ", error);
        alert("Failed to add comment.");
      });
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    fetch(`http://localhost:8080/bugs/${bugId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editDetails)
    })
    .then(response => response.json())
    .then(() => {
      alert("Bug updated successfully!");
      navigate('/DeveloperDashboard');
    })
    .catch(error => {
      console.error("Error updating bug: ", error);
      alert("Failed to update bug.");
    });
  };



  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Edit Bug Details (ID: {bugId})</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormControl fullWidth>
          <InputLabel id="buggyProgram-label">Program</InputLabel>
          <Select
            labelId="buggyProgram-label"
            name="buggyProgram"
            value={editDetails.buggyProgram || ''}
            label="Program"
            onChange={handleInputChange}
          >
            {programs.map((program, index) => (
              <MenuItem key={index} value={program.program}>{program.program}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="buggyProgramVersion-label">Program Version</InputLabel>
          <Select
            labelId="buggyProgramVersion-label"
            name="buggyProgramVersion"
            value={editDetails.buggyProgramVersion || ''}
            label="Program Version"
            onChange={handleInputChange}
          >
            {programs.filter(p => p.program === editDetails.buggyProgram).map((option, index) => (
              <MenuItem key={index} value={option.version}>{option.version}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="assignedTo-label">Assigned To</InputLabel>
          <Select
            labelId="assignedTo-label"
            name="assignedTo"
            value={editDetails.assignedTo || ''}
            label="Assigned To"
            onChange={handleInputChange}
          >
            {developers.map((developer, index) => (
              <MenuItem key={index} value={developer}>{developer}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="reportedBy-label">Reported By</InputLabel>
          <Select
            labelId="reportedBy-label"
            name="reportedBy"
            value={editDetails.reportedBy || ''}
            label="Reported By"
            onChange={handleInputChange}
          >
            {developers.map((developer, index) => (
              <MenuItem key={index} value={developer}>{developer}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="resolvedBy-label">Resolved By</InputLabel>
          <Select
            labelId="resolvedBy-label"
            name="resolvedBy"
            value={editDetails.resolvedBy || ''}
            label="Resolved By"
            onChange={handleInputChange}
          >
            {developers.map((developer, index) => (
              <MenuItem key={index} value={developer}>{developer}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
        <InputLabel id="testedBy-label">Tested By</InputLabel>
          <Select
            labelId="testedBy-label"
            name="testedBy"
            value={editDetails.testedBy || ''}
            label="Tested By"
            onChange={handleInputChange}
          >
            {developers.map((developer, index) => (
              <MenuItem key={index} value={developer}>{developer}</MenuItem>
            ))}
          </Select>
        </FormControl>




        {Object.entries(editDetails).filter(([key]) => !['reportedBy','resolvedBy','testedBy','assignedTo','buggyProgram', 'buggyProgramVersion', 'comments', 'newComment', 'attachments','bug_id','severity','reportType'].includes(key)).map(([key, value]) => (
          key !== 'reproducible' ? (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              name={key}
              value={value}
              onChange={handleInputChange}
              type={key.includes('Date') ? 'date' : 'text'}
              fullWidth
              InputLabelProps={key.includes('Date') ? { shrink: true } : undefined}
              />
            ) : (
              <FormControlLabel
                key="reproducible"
                control={<Checkbox checked={editDetails.reproducible || false} onChange={handleInputChange} name="reproducible" />}
                label="Reproducible"
              />
            )
          ))}
          <FormControl fullWidth>
            <InputLabel id="reportType-label">Report Type</InputLabel>
            <Select
              labelId="reportType-label"
              name="reportType"
              value={editDetails.reportType || ''}
              label="Report Type"
              onChange={handleInputChange}
            >
              <MenuItem value="CODING_ERROR">Coding Error</MenuItem>
              <MenuItem value="DESIGN_ISSUE">Design Issue</MenuItem>
              <MenuItem value="NEW_REQUIREMENT">New Requirement</MenuItem>
              <MenuItem value="QUERY">Query</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="severity-label">Severity</InputLabel>
            <Select
              labelId="severity-label"
              name="severity"
              value={editDetails.severity || ''}
              label="Severity"
              onChange={handleInputChange}
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="SERIOUS">Serious</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" gutterBottom mt={2}>Comments</Typography>
          {editDetails.comments && editDetails.comments.map((comment, index) => (
            <Typography key={index} sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
              {comment.commentTime ? new Date(comment.commentTime).toLocaleString() : "Recent"}: {comment.comment}
            </Typography>
          ))}
          <TextField
            label="Add a Comment"
            name="newComment"
            value={editDetails.newComment}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />
          <Button onClick={handleAddComment} variant="contained" color="secondary" sx={{ mt: 2 }}>
            Add Comment
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    );
  };
  
  export default DeveloperBugDetails;
  