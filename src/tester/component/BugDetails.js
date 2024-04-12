import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TesterBugDetails = () => {
  const { bugId } = useParams();
  const [bugDetails, setBugDetails] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`http://localhost:8080/bugs/${bugId}`)
      .then(response => response.json())
      .then(data => {
        setBugDetails(data);
      })
      .catch(error => console.error("Error fetching bug details: ", error));
  }, [bugId]);

  const goToDeveloperDashboard = () => {
    navigate('/TesterDashboard'); // Navigate to Developer Dashboard
  };

  if (!bugDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>Bug Details (ID: {bugDetails.bug_id})</h2>
      <div>
        <p><strong>Program:</strong> {bugDetails.buggyProgram} (Version: {bugDetails.buggyProgramVersion})</p>
        <p><strong>Report Type:</strong> {bugDetails.reportType}</p>
        <p><strong>Severity:</strong> {bugDetails.severity}</p>
        <p><strong>Summary:</strong> {bugDetails.problemSummary}</p>
        <p><strong>Reproducible:</strong> {bugDetails.reproducible ? 'Yes' : 'No'}</p>
        <p><strong>Detailed Summary:</strong> {bugDetails.detailedSummary}</p>
        <p><strong>Suggestion:</strong> {bugDetails.suggestion}</p>
        <p><strong>Functional Area:</strong> {bugDetails.functionalArea}</p>
        <p><strong>Assigned To:</strong> {bugDetails.assignedTo}</p>
        <p><strong>Status:</strong> {bugDetails.status}</p>
        <p><strong>Priority:</strong> {bugDetails.priority}</p>
        <p><strong>Resolution:</strong> {bugDetails.resolution}</p>
        <p><strong>Resolution Version:</strong> {bugDetails.resolutionVersion}</p>
        <p><strong>Resolved By:</strong> {bugDetails.resolvedBy}</p>
        <p><strong>Resolved Date:</strong> {bugDetails.resolvedDate}</p>
        <p><strong>Tested By:</strong> {bugDetails.testedBy}</p>
        <p><strong>Tested Date:</strong> {bugDetails.testedDate}</p>
        <p><strong>Treat As Deferred:</strong> {bugDetails.treatAsDeferred ? 'Yes' : 'No'}</p>
        <button onClick={goToDeveloperDashboard}>Tester Dashboard</button>
      </div>
    </div>
  );
};

export default TesterBugDetails;
