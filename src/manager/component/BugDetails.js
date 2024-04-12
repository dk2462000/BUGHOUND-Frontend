import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const ManagerBugDetails = () => {
  const { bugId } = useParams();
  const [bugDetails, setBugDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const navigate = useNavigate(); 

 

  useEffect(() => {
    fetch(`http://localhost:8080/bugs/${bugId}`)
      .then(response => response.json())
      .then(data => {
        setBugDetails(data);
        // Initialize form with existing data
        setEditDetails({
          functionalArea: data.functionalArea,
          assignedTo: data.assignedTo,
          status: data.status,
          priority: data.priority,
          resolution: data.resolution,
          resolutionVersion: data.resolutionVersion,
          resolvedBy: data.resolvedBy,
          resolvedDate: data.resolvedDate,
          testedBy: data.testedBy,
          testedDate: data.testedDate,
          treatAsDeferred: data.treatAsDeferred,
          comment: '',  // For adding new comments
        });
      })
      .catch(error => console.error("Error fetching bug details: ", error));
  }, [bugId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/bugs/${bugId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editDetails)
    })
    .then(response => response.json())
    .then(data => {
      setBugDetails(data);
      setIsEditing(false);
      alert("Bug updated successfully!");
    })
    .catch(error => {
      console.error("Error updating bug: ", error);
      alert("Failed to update bug.");
    });
  };

  const goToManagerDashboard = () => {
    navigate('/ManagerDashboard'); // Navigate to Developer Dashboard
  };

  if (!bugDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>Bug Details (ID: {bugDetails.bug_id})</h2>
      {!isEditing ? (
        <div>
          <p><strong>Program:</strong> {bugDetails.buggyProgram} (Version: {bugDetails.buggyProgramVersion})</p>
          <p><strong>Report Type:</strong> {bugDetails.reportType}</p>
          <p><strong>Severity:</strong> {bugDetails.severity}</p>
          <p><strong>Summary:</strong> {bugDetails.problemSummary}</p>
          <p><strong>Reproducible:</strong> {bugDetails.reproducible ? 'Yes' : 'No'}</p>
          <p><strong>Detailed Summary:</strong> {bugDetails.detailedSummary}</p>
          <p><strong>Suggestion:</strong> {bugDetails.suggestion}</p>
          <button onClick={() => setIsEditing(true)}>Edit Bug</button>
          <button onClick={goToManagerDashboard}>Manager Dashboard</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Functional Area:
            <input type="text" name="functionalArea" value={editDetails.functionalArea} onChange={handleInputChange} />
          </label>
          <label>
            Assigned To:
            <input type="text" name="assignedTo" value={editDetails.assignedTo} onChange={handleInputChange} />
          </label>
          <label>
            Status:
            <input type="text" name="status" value={editDetails.status} onChange={handleInputChange} />
          </label>
          <label>
            Priority:
            <input type="text" name="priority" value={editDetails.priority} onChange={handleInputChange} />
          </label>
          <label>
            Resolution:
            <input type="text" name="resolution" value={editDetails.resolution} onChange={handleInputChange} />
          </label>
          <label>
            Resolution Version:
            <input type="text" name="resolutionVersion" value={editDetails.resolutionVersion} onChange={handleInputChange} />
          </label>
          <label>
            Resolved By:
            <input type="text" name="resolvedBy" value={editDetails.resolvedBy} onChange={handleInputChange} />
          </label>
          <label>
            Resolved Date:
            <input type="date" name="resolvedDate" value={editDetails.resolvedDate} onChange={handleInputChange} />
          </label>
          <label>
            Tested By:
            <input type="text" name="testedBy" value={editDetails.testedBy || ''} onChange={handleInputChange} />
          </label>
          <label>
            Tested Date:
            <input type="date" name="testedDate" value={editDetails.testedDate || ''} onChange={handleInputChange} />
          </label>
          <label>
            Treat As Deferred:
            <select name="treatAsDeferred" value={editDetails.treatAsDeferred} onChange={handleInputChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label>
            Comment:
            <textarea name="comment" value={editDetails.comment} onChange={handleInputChange} />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          
        </form>
      )}
    </div>
  );
};

export default ManagerBugDetails;
