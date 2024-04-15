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

const ManagerBugDetails = () => {
  const { bugId } = useParams();
  const [editDetails, setEditDetails] = useState({});
  const [programs, setPrograms] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();
  const [functionalAreas, setFunctionalAreas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/functions")
      .then(response => response.json())
      .then(setFunctionalAreas)
      .catch(error => console.error("Error fetching functional areas: ", error));


    fetch(`http://localhost:8080/bugs/${bugId}`)
      .then(response => response.json())
      .then(data => setEditDetails(data))
      .catch(error => console.error("Error fetching bug details: ", error));

    fetch("http://localhost:8080/programs")
      .then(response => response.json())
      .then(setPrograms)
      .catch(error => console.error("Error fetching programs: ", error));

    fetch("http://localhost:8080/user/usernames")
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
    e.preventDefault();
    fetch(`http://localhost:8080/bugs/${bugId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editDetails)
    })
    .then(response => response.json())
    .then(() => {
      alert("Bug updated successfully!");
      navigate('/ManagerDashboard');
    })
    .catch(error => {
      console.error("Error updating bug: ", error);
      alert("Failed to update bug.");
    });
  };

  const byteArrayToBlobUrl = (byteArray, extension = "txt") => {
    const byteCharacters = atob(byteArray);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArrayFinal = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArrayFinal], { type: getMimeType(extension) });
    return URL.createObjectURL(blob);
  };

  const getMimeType = (extension) => {
    if (!extension) {
      return 'application/octet-stream'; // Default MIME type for unknown files
    }
    switch(extension.toLowerCase()) {
      case 'pdf': return 'application/pdf';
      case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'txt': return 'text/plain';
      case 'jpg': case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      default: return 'application/octet-stream'; // Generic binary data MIME type
    }
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
    {[...new Set(programs.map(p => p.program))].map((programName, index) => (
      <MenuItem key={index} value={programName}>{programName}</MenuItem>
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
            <MenuItem value="MINOR">MINOR</MenuItem>
            <MenuItem value="SERIOUS">SERIOUS</MenuItem>
            <MenuItem value="FATAL">FATAL</MenuItem>
           
          </Select>
        </FormControl>

        

        <TextField
          label="Problem Summary"
          name="problemSummary"
          value={editDetails.problemSummary || ''}
          onChange={handleInputChange}
          fullWidth
        />

        <FormControlLabel
          control={<Checkbox checked={editDetails.reproducible || false} onChange={handleInputChange} name="reproducible" />}
          label="Reproducible"
        />

        <TextField
          label="Detailed Summary"
          name="detailedSummary"
          value={editDetails.detailedSummary || ''}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
        />

        <TextField
          label="Suggestion"
          name="suggestion"
          value={editDetails.suggestion || ''}
          onChange={handleInputChange}
          fullWidth
        />

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

        <TextField
          label="Report Date"
          name="reportDate"
          type="date"
          value={editDetails.reportDate ? editDetails.reportDate.split("T")[0] : ''}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

<FormControl fullWidth>
          <InputLabel id="functionalArea-label">Functional Area</InputLabel>
          <Select
            labelId="functionalArea-label"
            name="functionalArea"
            value={editDetails.functionalArea || ''}
            label="Functional Area"
            onChange={handleInputChange}
          >
            {functionalAreas.map((area, index) => (
              <MenuItem key={index} value={area.funcName}>{area.funcName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="assignedTo-label">Assigned To</InputLabel
          ><Select
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
          <FormControl fullWidth>
          <InputLabel id="Status-label">Status</InputLabel>
          <Select
            labelId="Status-label"
            name="Status"
            value={editDetails.status || ''}
            label="Status"
            onChange={handleInputChange}
          >
            <MenuItem value="OPEN">OPEN</MenuItem>
            <MenuItem value="CLOSED">CLOSED</MenuItem>
            <MenuItem value="RESOLVED">RESOLVED</MenuItem>
           
          </Select>
        </FormControl>

        
        <FormControl fullWidth>
  <InputLabel id="priority-label">Priority</InputLabel>
  <Select
    labelId="priority-label"
    name="priority"
    value={editDetails.priority || ''}
    label="Priority"
    onChange={handleInputChange}
  >
    <MenuItem value="FIX_IMMEDIATELY">Fix immediately</MenuItem>
    <MenuItem value="FIX_AS_SOON_AS_POSSIBLE">Fix as soon as possible</MenuItem>
    <MenuItem value="FIX_BEFORE_NEXT_MILESTONE">Fix before next milestone</MenuItem>
    <MenuItem value="FIX_BEFORE_RELEASE">Fix before release</MenuItem>
    <MenuItem value="FIX_IF_POSSIBLE">Fix if possible</MenuItem>
    <MenuItem value="OPTIONAL">Optional</MenuItem>
  </Select>
</FormControl>


        {/* <TextField
          label="Priority"
          name="priority"
          value={editDetails.priority || ''}
          onChange={handleInputChange}
          fullWidth
        /> */}
        <FormControl fullWidth>
  <InputLabel id="resolution-label">Resolution</InputLabel>
  <Select
    labelId="resolution-label"
    name="resolution"
    value={editDetails.resolution || ''}
    label="Resolution"
    onChange={handleInputChange}
  >
    <MenuItem value="PENDING">Pending</MenuItem>
    <MenuItem value="FIXED">Fixed</MenuItem>
    <MenuItem value="CANNOT_BE_REPRODUCED">Cannot be reproduced</MenuItem>
    <MenuItem value="DEFERRED">Deferred</MenuItem>
    <MenuItem value="AS_DESIGNED">As designed</MenuItem>
    <MenuItem value="WITHDRAWN_BY_REPORTER">Withdrawn by reporter</MenuItem>
    <MenuItem value="NEED_MORE_INFO">Need more info</MenuItem>
    <MenuItem value="DISAGREE_WITH_SUGGESTION">Disagree with suggestion</MenuItem>
    <MenuItem value="DUPLICATE">Duplicate</MenuItem>
  </Select>
</FormControl>
<FormControl fullWidth>
  <InputLabel id="resolutionVersion-label">Resolution Version</InputLabel>
  <Select
    labelId="resolutionVersion-label"
    name="resolutionVersion"
    value={editDetails.resolutionVersion || ''}
    label="Resolution Version"
    onChange={handleInputChange}
  >
    {/* Dynamic list of software versions */}
    {programs.filter(p => p.program === editDetails.buggyProgram).map((option, index) => (
      <MenuItem key={index} value={option.version}>{option.version}</MenuItem>
    ))}
  </Select>
</FormControl>



        <FormControl fullWidth>
          <InputLabel id="resolvedBy-label">Resolved By</InputLabel
          ><Select
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

        <TextField
          label="Resolved Date"
          name="resolvedDate"
          type="date"
          value={editDetails.resolvedDate ? editDetails.resolvedDate.split("T")[0] : ''}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

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

        <TextField
          label="Tested Date"
          name="testedDate"
          type="date"
          value={editDetails.testedDate ? editDetails.testedDate.split("T")[0] : ''}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <FormControlLabel
          control={<Checkbox checked={editDetails.treatAsDeferred || false} onChange={handleInputChange} name="treatAsDeferred" />}
          label="Treat As Deferred"
        />

<Typography variant="h6" gutterBottom mt={2}>Attachments</Typography>
        {editDetails.attachments && editDetails.attachments.map((attachment, index) => (
          <div key={index} sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <a href={byteArrayToBlobUrl(attachment.attachment, attachment.extension)} download={`Attachment_${attachment.attachmentId}.${attachment.extension || 'txt'}`}>
              Download Attachment {attachment.attachmentId}
            </a>
          </div>
        ))}

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ManagerBugDetails;
