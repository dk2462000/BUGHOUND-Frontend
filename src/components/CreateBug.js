import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./CreateBug.css"; // Import your CSS file for additional styling
import { useAuth } from '../context/AuthProvider';
import DeveloperDashboard from "../developer/DeveloperDashboard";
import { useNavigate } from 'react-router-dom';


function CreateBug() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { username, userType } = auth;  
  const demoNames = [];
  demoNames.push(username);

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
    reportedBy: "",
    reportDate: "",
  });

  // const [employees, setEmployees] = useState([]);
  
  // // Fetch employees data from the API
  // useEffect(() => {
  //   axios.get("http://localhost:8080/employees")
  //     .then(response => {
  //       setEmployees(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching employees:", error);
  //     });
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBugData({ ...bugData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/bugs/createBug", bugData);
      console.log("Bug report submitted:", response.data);
      navigate("/DeveloperDashboard");
      // Optionally, you can navigate to another page after successful submission
    } catch (error) {
      console.error("Error submitting bug report:", error);
    }
  };

  return (
    <div className="create-bug-form">
      <h1>New Bug Report Entry Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="buggyProgram"
          label="Program"
          value={bugData.buggyProgram}
          onChange={handleChange}
          name="buggyProgram"
        />
        <TextField
          required
          id="buggyProgramVersion"
          label="Program Version"
          value={bugData.buggyProgramVersion}
          onChange={handleChange}
          name="buggyProgramVersion"
        />
        <TextField
          required
          id="reportType"
          label="Report Type"
          value={bugData.reportType}
          onChange={handleChange}
          name="reportType"
        />
        <TextField
          select
          required
          id="severity"
          label="Severity"
          value={bugData.severity}
          onChange={handleChange}
          name="severity"
        >
          {["Low", "Medium", "High", "Serious"].map((severityOption) => (
            <MenuItem key={severityOption} value={severityOption}>
              {severityOption}
            </MenuItem>
          ))}
        </TextField>
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
          select
          required
          id="reproducible"
          label="Reproducible"
          value={bugData.reproducible}
          onChange={handleChange}
          name="reproducible"
        >
          
          {["true","false"].map((severityOption) => (
            <MenuItem key={severityOption} value={severityOption}>
              {severityOption}
            </MenuItem>
          ))}

</TextField>
       
        <TextField
          required
          id="detailedSummary"
          label="Problem Description"
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
        {demoNames.map((name, index) => (
          <MenuItem key={index} value={name}>
            {name}
          </MenuItem>
        ))}
</TextField>

        <TextField
          required
          id="reportDate"
          label="Reported Date"
          type="date"
          value={bugData.reportDate}
          onChange={handleChange}
          name="reportDate"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateBug;
