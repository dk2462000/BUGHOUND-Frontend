import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayFunction({ functionList, fetchFunctions }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectionModel, setSelectionModel] = useState([]);
  const columns = [
    {
      field: "funcId",
      headerName: "Function ID",
      width: 150,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => navigate(`/edit-function/${params.value}`)}
        >
          {params.value}
        </Button>
      ),
    },
    { field: "funcName", headerName: "Function Name", width: 200 },
    { field: "programId", headerName: "Program ID", width: 150 },
    { field: "progName", headerName: "Program Name", width: 200 },
    { field: "progVersion", headerName: "Program Version", width: 150 },
    { field: "progRelease", headerName: "Program Release", width: 150 },
  ];

  useEffect(() => {
    const fetchProgramDetails = async () => {
      const detailedData = await Promise.all(
        functionList.map(async (func) => {
          const response = await fetch(
            `http://localhost:8080/program/${func.programId}`
          );
          const program = await response.json();
          return {
            ...func,
            progName: program.progName,
            progVersion: program.progVersion,
            progRelease: program.progRelease,
          };
        })
      );
      setData(detailedData);
    };
    fetchProgramDetails();
  }, [functionList]);

  const handleDelete = async () => {
    const deletePromises = selectionModel.map((id) => {
      return fetch(`http://localhost:8080/functions/remove/${id}`, {
        method: "DELETE",
      });
    });

    try {
      await Promise.all(deletePromises);
      fetchFunctions(); // Refresh the function list after successful deletion
      setSelectionModel([]);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div
      style={{
        height: 300,
        width: "80%",
        margin: "auto",
        marginTop: "30px",
        marginBottom: "50px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        sx={{ width: "100%" }}
      >
        Function List
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={setSelectionModel}
        rowSelectionModel={selectionModel}
      />
      <Typography
        variant="overline"
        component="h1"
        textAlign="center"
        sx={{ width: "100%" }}
      >
        Select function area(s) to delete
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        disabled={selectionModel.length === 0}
        style={{ marginTop: "10px" }}
      >
        Delete Selected Function(s)
      </Button>
    </div>
  );
}
