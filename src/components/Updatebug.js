import React from "react";
import "./CreateBug.css";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function UpdateBug() {

  function handleTreatedAsDeferredChange(e) {
    // Handle change for treatedAsDeferred
  }

  function handleTestedByChange(e) {
    // Handle change for testedBy
  }

  function handleResolvedByChange(e) {
    // Handle change for resolvedBy
  }

  function handleResolutionVersionChange(e) {
    // Handle change for resolutionVersion
  }

  function handleResolutionChange(e) {
    // Handle change for resolution
  }

  function handlePriorityChange(e) {
    // Handle change for priority
  }

  function handleStatusChange(e) {
    // Handle change for status
  }

  function handleFunctionalAreaChange(e) {
    // Handle change for functionalArea
  }

  function handleReproducibleChange(e) {
    // Handle change for reproducible
  }

  function handleAssignedToChange(e) {
    // Handle change for assignedTo
  }

  function handleReportedByChange(e) {
    // Handle change for reportedBy
  }

  function handleReportTypeChange(e) {
    // Handle change for reportType
  }
  function handleSeverityChange(e) {
    // Handle change for severity
  }

  function handleProgramChange(e) {
    // Handle change for program
  }

  function handleReset() {
    // Reset all state variables
  }

  function handleUpdateBug(e) {
    // Handle updating bug
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          New Bug Report Entry Page
        </h1>
        <div className="createbugform">
          <FormControl fullWidth>
            <div className="row1">
              <label>Program</label>
              <Select
                labelId="program"
                className="program-select"
                id="program-select"
                label="Program"
                size="small"
                style={{ width: "25%" }}
              >
                <MenuItem value={"CodeSnap"}>CodeSnap</MenuItem>
                <MenuItem value={"CodeFlow"}>CodeFlow</MenuItem>
                <MenuItem value={"CodeCompass"}>CodeCompass</MenuItem>
                <MenuItem value={"CodeTracker"}>CodeTracker</MenuItem>
                <MenuItem value={"CodeGuard"}>CodeGuard</MenuItem>
                <MenuItem value={"CodeLens"}>CodeLens</MenuItem>
                <MenuItem value={"CodeShield"}>CodeShield</MenuItem>
                <MenuItem value={"CodeMentor"}>CodeMentor</MenuItem>
              </Select>
              {/* Other select menus */}
            </div>
            {/* Other form elements */}
            <div className="checkbox">
              <input
                type="checkbox"
                lable="Treated as Deferred"
              />
              <span>Treated as Deferred</span>
            </div>
            <div className="submitType">
              <Button variant="contained" onClick={handleUpdateBug}>
                Update Bug
              </Button>
              <Button variant="contained" onClick={handleReset}>
                Reset Bug
              </Button>
            </div>
          </FormControl>
        </div>
      </LocalizationProvider>
    </>
  );
}

export default UpdateBug;
