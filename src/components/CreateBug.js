import React, { useState,useEffect } from "react";
import "./CreateBug.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Send } from "@mui/icons-material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CreateBug() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
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
                <MenuItem>CodeSnap</MenuItem>
                <MenuItem>CodeFlow</MenuItem>
                <MenuItem>CodeCompass</MenuItem>
                <MenuItem>CodeTracker</MenuItem>
                <MenuItem>CodeGuard</MenuItem>
                <MenuItem>CodeLens</MenuItem>
                <MenuItem>CodeShield</MenuItem>
                <MenuItem>CodeMentor</MenuItem>
              </Select>
              <label>Report Type</label>
              <Select
                labelId="Report Type"
                className="report-type-select"
                id="report-type-select"
                label="Report Type"
                size="small"
                style={{ width: "25%" }}
              >
                <MenuItem>Functional Bugs</MenuItem>
                <MenuItem>Usability Bugs</MenuItem>
                <MenuItem>Performance Bugs</MenuItem>
                <MenuItem>Compatibility Bugs</MenuItem>
                <MenuItem>Security Bugs</MenuItem>
                <MenuItem>Documentation Bugs</MenuItem>
                <MenuItem>Localization Bugs</MenuItem>
                <MenuItem>Integration Bugs</MenuItem>
              </Select>
              <label>Severity</label>
              <Select
                labelId="Severity"
                id="severity-select"
                label="Severity"
                size="small"
                style={{ width: "25%" }}
              >
                <MenuItem>Minor</MenuItem>
                <MenuItem>Major</MenuItem>
                <MenuItem>Serious</MenuItem>
              </Select>
            </div>
            <div className="problem-summary-textfeild">
              <TextField
                required
                id="outlined-required"
                label="Problem Summary"
                style={{ width: "80%" }}
                defaultValue=""
              />
              <input type="checkbox" lable="Reproducible" />
              Reproducible
            </div>
            <div className="problem-description-textfeild">
              <TextField
                placeholder="Problem Description"
                multiline
                rows={2}
                style={{ width: "100%" }}
              />
            </div>
            <div className="suggested-fix-textfeild">
              <TextField
                placeholder="Suggested Fix"
                multiline
                rows={2}
                style={{ width: "100%" }}
              />
            </div>
            <label>Reported By</label>
            <div className="reportanddate">
              <Select
                labelId="Reported By"
                className="reported-by-select"
                id="report-by-select"
                label="Reported by"
                size="small"
                style={{ width: "30%" }}
              >
                <MenuItem>Mia</MenuItem>
                <MenuItem>William</MenuItem>
                <MenuItem>Lucas</MenuItem>
                <MenuItem>Ava</MenuItem>
                <MenuItem>Emma</MenuItem>
                <MenuItem>James</MenuItem>
              </Select>
              <div className="date">
                <DatePicker
                  label="Reported Date"
                  inputFormat="dd-MM-yyyy"
                  style={{ width: "30%" }}
                />
              </div>
            </div>
            {/* Continue with other form fields */}
            {/* Remove other form fields and buttons */}
          </FormControl>
        </div>
      </LocalizationProvider>
    </>
  );
}

export default CreateBug;
