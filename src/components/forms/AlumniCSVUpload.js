import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { AddAlumniCSV, GetAlumni } from "../../services/admin_alumni";

const AlumniCSVUpload = ({ onSubmit, onClose }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(`Uploaded CSV file: ${selectedFile.name}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("fileUpload", file);
      console.log(formData);

      AddAlumniCSV(dispatch, formData)
        .then(() => {
          console.log("CSV file uploaded successfully");
          onSubmit(formData);
          onClose();
          GetAlumni(dispatch);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No file selected. Please choose a CSV file.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} sm={12} container alignItems="center" gap={2}>
        <input
          type="file"
          accept=".csv"
          id="csv-upload-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
          name="fileUpload"
        />
        <Button
          variant="contained"
          size="medium"
          style={{ backgroundColor: "#4cceac" }}
          onClick={() => document.getElementById("csv-upload-input").click()}
        >
          Add File
        </Button>
        <span>{file ? file.name : ""}</span>
      </Grid>
      <Grid item container xs={12} sm={12} justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          size="medium"
          style={{
            padding: "10px",
            marginTop: "1rem",
            backgroundColor: "#221769",
            color: "#FFFFFF",
          }}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default AlumniCSVUpload;
