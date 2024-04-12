import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const DeveloperDashboard = () => {
  const { auth } = useAuth();
  const { username } = auth;  
  const [bugs, setBugs] = useState([]);
  const [assignedbugs, setAssignedBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:8080/bugs/summary/reportedBy/${username}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) setBugs(data);
          else setBugs([]); // Ensure data is always an array
        })
        .catch(error => {
          console.error("Error fetching reported bugs: ", error);
          setBugs([]); // Set to empty array on error
        });

      fetch(`http://localhost:8080/bugs/summary/assignedTo/${username}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) setAssignedBugs(data);
          else setAssignedBugs([]); // Ensure data is always an array
        })
        .catch(error => {
          console.error("Error fetching assigned bugs: ", error);
          setAssignedBugs([]); // Set to empty array on error
        });
    }
  }, [username]); // Added username as a dependency

  const navigateToCreateBug = () => {
    navigate("/createbug");
  };

  const navigateToDeveloperBugDetails = (bugId) => {
    navigate(`/developer/bugdetails/${bugId}`);
  };

  return (
    <div>
      <button onClick={navigateToCreateBug}>Create Bug</button>
      <h2>Reported Bugs</h2>
      <table>
        <thead>
          <tr>
            <th>Bug ID</th>
            <th>Buggy Program</th>
            <th>Problem Summary</th>
          </tr>
        </thead>
        <tbody>
          {bugs.length > 0 ? bugs.map((bug) => (
            <tr key={bug.bugId}>
              <td>
                <button onClick={() => navigateToDeveloperBugDetails(bug.bugId)} style={{ border: 'none', background: 'none', padding: 0, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                  {bug.bugId}
                </button>
              </td>
              <td>{bug.buggyProgram}</td>
              <td>{bug.problemSummary}</td>
            </tr>
          )) : <tr><td colSpan="3">No reported bugs found.</td></tr>}
        </tbody>
      </table>

      <h2>Assigned Bugs</h2>
      <table>
        <thead>
          <tr>
            <th>Bug ID</th>
            <th>Buggy Program</th>
            <th>Problem Summary</th>
          </tr>
        </thead>
        <tbody>
          {assignedbugs.length > 0 ? assignedbugs.map((bug) => (
            <tr key={bug.bugId}>
              <td>
                <button onClick={() => navigateToDeveloperBugDetails(bug.bugId)} style={{ border: 'none', background: 'none', padding: 0, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                  {bug.bugId}
                </button>
              </td>
              <td>{bug.buggyProgram}</td>
              <td>{bug.problemSummary}</td>
            </tr>
            )) : <tr><td colSpan="3">No assigned bugs found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default DeveloperDashboard;
