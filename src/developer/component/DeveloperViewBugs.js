import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import AppBar from "../../AppBar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.action.hover,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DetailTableContainer = styled(TableContainer)({
  marginTop: "20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const DeveloperViewBugs = () => {
  const { bugId } = useParams();
  const [editDetails, setEditDetails] = useState({});
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/bugs/${bugId}`)
      .then((response) => response.json())
      .then((data) => {
        setEditDetails(data);
      })
      .catch((error) => console.error("Error fetching bug details: ", error));
  }, [bugId]);

  const goToDashboard = () => {
    navigate("/DeveloperDashBoard");
  };

  useEffect(() => {
    async function fetchBugDetails() {
      try {
        const response = await axios.get(`http://localhost:8080/bugs/${bugId}`);
        if (response.data.attachments && response.data.attachments.length > 0) {
          const fetchedAttachments = response.data.attachments.map(
            (attachment, index) => ({
              ...attachment,
              url: byteArrayToBlobUrl(
                attachment.attachment,
                attachment.attachmentExt
              ),
              extension: attachment.attachmentExt, // Use the extension from the database
            })
          );
          setAttachments(fetchedAttachments);
        } else {
          setError("No attachments found for this bug.");
        }
      } catch (error) {
        console.error("Failed to fetch bug details:", error);
        setError("Failed to fetch attachments.");
      }
    }
    fetchBugDetails();
  }, [bugId]);

  function byteArrayToBlobUrl(byteArray, fileExtension) {
    const byteArrayInFormat = new Uint8Array(
      atob(byteArray)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([byteArrayInFormat], {
      type: getMimeType(fileExtension),
    });
    return URL.createObjectURL(blob);
  }

  function getMimeType(extension) {
    switch (extension.toLowerCase()) {
      case "pdf":
        return "application/pdf";
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      case "txt":
        return "text/plain";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      default:
        return "application/octet-stream"; // A generic binary data MIME type
    }
  }

  if (!editDetails)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  const entries = Object.entries(editDetails).filter(
    ([key]) => !["comments", "newComment", "attachments"].includes(key)
  );

  return (
    <div>
      <AppBar title="Bug Details" />
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Button
          onClick={goToDashboard}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          style={{ margin: "20px" }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h5" gutterBottom>
          View Bug Details (ID: {bugId})
        </Typography>
        <DetailTableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {entries.map(([key, value]) => (
                <StyledTableRow key={key}>
                  <StyledTableCell component="th" scope="row">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                  </StyledTableCell>
                  <TableCell>
                    {typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : value}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </DetailTableContainer>
        <Typography variant="h6" gutterBottom mt={2}>
          Comments
        </Typography>
        <DetailTableContainer component={Paper}>
          <Table aria-label="comments table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date and Time</StyledTableCell>
                <StyledTableCell>Comment</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editDetails.comments &&
                editDetails.comments.map((comment, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>
                      {comment.commentTime
                        ? new Date(comment.commentTime).toLocaleString()
                        : "Recent"}
                    </TableCell>
                    <TableCell>{comment.comment}</TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </DetailTableContainer>

        <Typography variant="h6" gutterBottom mt={2}>
          Attachments
        </Typography>
        <div>
          {attachments.length > 0 ? (
            attachments.map((attachment, index) => (
              <div key={index}>
                <a
                  href={attachment.url}
                  download={`Bug_${bugId}_Attachment${attachment.attachmentId}.${attachment.extension}`}
                >
                  Download Attachment {attachment.attachmentId}
                </a>
              </div>
            ))
          ) : (
            <p>{error}</p>
          )}
        </div>
      </Box>
    </div>
  );
};

export default DeveloperViewBugs;
