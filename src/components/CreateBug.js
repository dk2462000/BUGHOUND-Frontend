import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CreateBug.css";
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function CreateBug() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { user: username, userType } = auth;  
  const [programList, setProgramList] = useState({});
  const [files, setFiles] = useState([]);
  const [warning, setWarning] = useState('');
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
  
  useEffect(() => {
    axios.get("http://localhost:8080/programs")
      .then(response => {
        const fetchedPrograms = response.data;
        const groupedPrograms = {};
        fetchedPrograms.forEach((program) => {
          if (!groupedPrograms[program.program]) {
            groupedPrograms[program.program] = [];
          }
          groupedPrograms[program.program].push(program.version);
        });
        setProgramList(groupedPrograms);
      })
      .catch(error => {
        console.error("Error fetching programs:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "buggyProgram") {
      setBugData({
        ...bugData,
        buggyProgram: value,
        buggyProgramVersion: '',  // Reset version when program changes
      });
    } else {
      setBugData({ ...bugData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleFileChange = (event) => {
    if (files.length >= 3) {
        alert('You can only attach a maximum of three files.');
        event.target.value = '';
        return;
    }

    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.filter(file => file.size <= 2097152); // Limit file size to 2MB
    if (selectedFiles.some(file => file.size > 2097152)) {
      alert('One or more files exceed the maximum size limit of 2MB and were not added.');
      event.target.value = '';
    }
    const totalFiles = [...files, ...newFiles].slice(0, 3); // Limit to 3 files total
    setFiles(totalFiles);
  };

  const removeFile = (index) => {
    setFiles(current => current.filter((_, i) => i !== index));
    setWarning('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attachments = await Promise.all(files.map(async (file, index) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
          reader.onload = () => {
              const byteArray = new Uint8Array(reader.result);
              const blob = new Blob([byteArray]);
              console.log("Size of the blob in bytes:", blob.size);
              const extension = file.name.split('.').pop();
              resolve({
                  attachmentId: `${index + 1}`,
                  attachmentExt: extension, // Include the file extension
                  attachmentData: Array.from(byteArray)
              });
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
      });
    }));

    const fullBugData = { ...bugData, attachments };

    try {
      const response = await axios.post("http://localhost:8080/bugs/createBug", fullBugData);
      console.log("Bug report submitted:", response.data);
      if (userType === 'DEVELOPER') {
        navigate('/DeveloperDashboard');
      } else if (userType === 'TESTER') {
        navigate('/TesterDashboard');
      } else if (userType === 'MANAGER') {
        navigate('/ManagerDashboard');
      } else {
        console.log('Role not recognized or user does not have a specific dashboard');
        // Optionally navigate to a default or error page
        // navigate('/default');
      }
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
          {Object.keys(programList).map((program, index) => (
            <MenuItem key={index} value={program}>
              {program}
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
          disabled={!bugData.buggyProgram}
        >
          {bugData.buggyProgram && programList[bugData.buggyProgram].map((version, index) => (
            <MenuItem key={index} value={version}>
              {version}
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
          <MenuItem value="CODING_ERROR">CODING ERROR</MenuItem>
          <MenuItem value="DESIGN_ISSUE">DESIGN ISSUE</MenuItem>
          <MenuItem value="SUGGESTION">SUGGESTION</MenuItem>
          <MenuItem value="DOCUMENTATION">DOCUMENTATION</MenuItem>
          <MenuItem value="HARDWARE">HARDWARE</MenuItem>
          <MenuItem value="QUERY">QUERY</MenuItem>
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
          <MenuItem value="MINOR">MINOR</MenuItem>
          <MenuItem value="SERIOUS">SERIOUS</MenuItem>
          <MenuItem value="FATAL">FATAL</MenuItem>
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
        <div className="file-input-container">
                    <input type="file" id="file" multiple onChange={handleFileChange} />
                    <label htmlFor="file" className="file-input-label">Choose files (Max 3 files, 2MB each)</label>
                </div>
                {files.map((file, index) => (
                    <div key={index}>
                        {file.name} <Button onClick={() => removeFile(index)} color="secondary">Remove</Button>
                    </div>
                ))}
                {warning && <p className="warning">{warning}</p>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateBug;
