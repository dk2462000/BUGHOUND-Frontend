import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import AddFunction from "./AddFunction";
import DisplayFunction from "./DisplayFunction";
import { useNavigate } from "react-router-dom";

function ManageFunction() {
  const [functionList, setFunctionList] = useState([]);
  const navigate = useNavigate();

  const fetchFunctions = () => {
    fetch("http://localhost:8080/functions")
      .then((res) => res.json())
      .then((result) => {
        const transformedData = result.map((item, index) => ({
          id: index,
          funcName: item.funcName,
        }));
        setFunctionList(transformedData);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  const handleBack = () => {
    navigate("/ManagerDashboard", { replace: true }); // Navigates back to Manage Users
  };

  return (
    <div>
      <AppBar title={"Manage Functions"} />
      <button
        style={{ marginLeft: "20px" }}
        type="button"
        className="btn-submit"
        onClick={handleBack}
      >
        Back
      </button>
      <AddFunction onAddFunction={fetchFunctions} />
      <DisplayFunction
        functionList={functionList}
        fetchFunctions={fetchFunctions}
      />
    </div>
  );
}

export default ManageFunction;
