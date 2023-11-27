import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { formatDate } from "../constant/helper";

const CandidateModal = ({ open, onClose, user }) => {
  const dialogTitle = {
    fontSize: "20px",
  };
  const avatarContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
  };

  const headerRow = {
    whiteSpace: "nowrap",
    fontWeight: "bold",
    fontSize: "20px",
  };

  const spacerRowTop = {
    height: "24px",
  };

  const spacerRowBottom = {
    height: "4px",
  };

  const spacerRow = {
    height: "8px",
  };

  const fieldNameCell = {
    whiteSpace: "nowrap", // Prevent text wrapping
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const spacerCell = {};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={dialogTitle}>Candidate Details</DialogTitle>

      <DialogContent>
        <div style={avatarContainer}>
          <Avatar
            alt={`${user.alumni.firstName} ${user.alumni.lastName}`}
            src={`data:image/jpeg;base64,${user.alumni.profileImage}`}
            sx={{ width: 100, height: 100 }}
          />
        </div>

        <table>
          <tbody>
            <tr style={headerRow}>
              <td>PERSONAL INFORMATION</td>
            </tr>
            <tr style={spacerRow}></tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Full Name: </strong>
              </td>
              <td style={spacerCell}></td>
              <td>{`${user.alumni.firstName} ${user.alumni.lastName}`}</td>
            </tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Address:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>{user.alumni.alumniAddress}</td>
            </tr>
            <tr style={spacerRowTop}></tr>
            <tr style={headerRow}>CONTACT INFORMATION</tr>
            <tr style={spacerRowBottom}></tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Email:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>{user.alumni.email}</td>
            </tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Mobile:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>{user.alumni.mobileNumber}</td>
            </tr>
            <tr style={spacerRowTop}></tr>
            <tr style={headerRow}>EMPLOYMENT INFORMATION</tr>
            <tr style={spacerRowBottom}></tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Employment Status:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>{user.alumni.isEmployed ? "Employed" : "Unemployed"}</td>
            </tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Current Occupation:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>
                {user.alumni.isEmployed ? user.alumni.occupation : "Unemployed"}
              </td>
            </tr>
            <tr style={spacerRowTop}></tr>
            <tr style={headerRow}>JOB MATCH DETAILS</tr>
            <tr style={spacerRowBottom}></tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Date Matched:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>{formatDate(user.candidateDate)}</td>
            </tr>
            <tr style={spacerRow}></tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Compatilibity with Job:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>{user.score}</td>
            </tr>
            <tr style={spacerRow}></tr>
            <tr>
              <td style={fieldNameCell}>
                <strong>Compatilibity Score Details:</strong>
              </td>
              <td style={spacerCell}></td>
              <td>{user.explanation}</td>
            </tr>
            {/* Add more user profile details as needed */}
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CandidateModal;
