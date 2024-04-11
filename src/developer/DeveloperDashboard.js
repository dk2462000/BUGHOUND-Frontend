import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeveloperDashboard = () => {
  const [bugs, setBugs] = useState([]);
  const [assignedbugs, setAssignedBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/bugs/summary/reportedBy/ranjithk")
      .then(response => response.json())
      .then(data => setBugs(data))
      .catch(error => console.error("Error fetching data: ", error));

    fetch("http://localhost:8080/bugs/summary/assignedTo/developerB")
      .then(response => response.json())
      .then(data => setAssignedBugs(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  const navigateToCreateBug = () => {
    navigate("/createbug");
  };

  return (
    <div>
      <button onClick={navigateToCreateBug}>Create Bug</button>
      <table>
        <thead>
          <tr>
            <th>Bug ID</th>
            <th>Buggy Program</th>
            <th>Problem Summary</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map(bug => (
            <tr key={bug.bugId}>
              <td>{bug.bugId}</td>
              <td>{bug.buggyProgram}</td>
              <td>{bug.problemSummary}</td>
            </tr>
          ))}
        </tbody>
      </table>
            <br></br>
            <br></br>
            <br></br>

      <table>
        <thead>
          <tr>
            <th>Bug ID</th>
            <th>Buggy Program</th>
            <th>Problem Summary</th>
          </tr>
        </thead>
        <tbody>
          {assignedbugs.map(bug => (
            <tr key={bug.bugId}>
              <td>{bug.bugId}</td>
              <td>{bug.buggyProgram}</td>
              <td>{bug.problemSummary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeveloperDashboard;
