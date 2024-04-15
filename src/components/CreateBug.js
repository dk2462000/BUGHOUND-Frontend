import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CreateBug.css"; // Import your CSS file for additional styling
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function CreateBug() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { username } = auth;  
  const [programs, setPrograms] = useState([]);
  const [bugData, setBugData] = useState({
    buggyProgram: "",
    buggyProgramVersion: "",
    reportType: "",
    severity: "",
    attachments: [],
    problemSummary: "",
    reproducible: false,
    detailedSummary: "",
    suggestion: "",
    reportedBy: username,
    reportDate: "",
  });

  // Fetch programs data from the API
  useEffect(() => {
    axios.get("http://localhost:8080/programs")
      .then(response => {
        setPrograms(response.data);
      })
      .catch(error => {
        console.error("Error fetching programs:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBugData({ ...bugData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/bugs/createBug", bugData);
      console.log("Bug report submitted:", response.data);
      navigate("/DeveloperDashboard");
    } catch (error) {
      console.error("Error submitting bug report:", error);
    }
  };

  return (
    <div className="create-bug-form">
      <h1>New Bug Report Entry Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          required
          id="buggyProgram"
          label="Program"
          value={bugData.buggyProgram}
          onChange={handleChange}
          name="buggyProgram"
        >
          {programs.map((option, index) => (
            <MenuItem key={index} value={option.program}>
              {option.program}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          required
          id="buggyProgramVersion"
          label="Program Version"
          value={bugData.buggyProgramVersion}
          onChange={handleChange}
          name="buggyProgramVersion"
        >
          {programs.filter(p => p.program === bugData.buggyProgram).map((option, index) => (
            <MenuItem key={index} value={option.version}>
              {option.version}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          required
          id="reportType"
          label="Report Type"
          value={bugData.reportType}
          onChange={handleChange}
          name="reportType"
        >
          <MenuItem value="Bug">Bug</MenuItem>
          <MenuItem value="Feature_Request">Feature_Request</MenuItem>
          <MenuItem value="CODING_ERROR">CODING_ERROR</MenuItem>
        </TextField>
        <TextField
          select
          required
          id="severity"
          label="Severity"
          value={bugData.severity}
          onChange={handleChange}
          name="severity"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Serious">Serious</MenuItem>
        </TextField>
        <FormControlLabel
          control={<Checkbox checked={bugData.reproducible} onChange={handleChange} name="reproducible" />}
          label="Reproducible"
        />
        <TextField
          required
          id="problemSummary"
          label="Problem Summary"
          multiline
          rows={2}
          value={bugData.problemSummary}
          onChange={handleChange}
          name="problemSummary"
        />
        <TextField
          required
          id="detailedSummary"
          label="Detailed Description"
          multiline
          rows={4}
          value={bugData.detailedSummary}
          onChange={handleChange}
          name="detailedSummary"
        />
        <TextField
          id="suggestion"
          label="Suggested Fix"
          multiline
          rows={4}
          value={bugData.suggestion}
          onChange={handleChange}
          name="suggestion"
        />
        <TextField
          select
          required
          id="reportedBy"
          label="Reported By"
          value={bugData.reportedBy}
          onChange={handleChange}
          name="reportedBy"
        >
          <MenuItem value={username}>{username}</MenuItem>
        </TextField>
        <TextField
          required
          id="reportDate"
          label="Reported Date"
          type="date"
          value={bugData.reportDate}
          onChange={handleChange}
          name="reportDate"
          InputLabelProps={{
            shrink: true,  // This ensures the label does not overlap with the placeholder text
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateBug;
