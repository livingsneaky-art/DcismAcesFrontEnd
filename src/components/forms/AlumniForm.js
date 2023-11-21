import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MdCalendarMonth } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Badge } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  AddAlumni,
  EditAlumni,
  GetAlumni,
  GetAlumniByID,
} from "../../services/admin_alumni";
import { editAlumniError } from "../../app/alumniSlice";
import { programs } from "../constant/helper";

const AlumniForm = ({ onSubmit, id }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNum: "",
    programCode: "",
    programDescription: "",
    educationLevel: "",
    syGraduated: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [alumniDataLoaded, setAlumniDataLoaded] = useState(false);

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        if (id) {
          const alumniData = await GetAlumniByID(dispatch, id);
          if (alumniData) {
            setFormData({
              id: id,
              firstName: alumniData.firstName,
              lastName: alumniData.lastName,
              idNum: alumniData.idNum,
              programCode: alumniData.courses.programCode,
              programDescription: alumniData.courses.programDescription,
              educationLevel: alumniData.educationLevel,
              syGraduated: alumniData.syGraduated,
            });
            setAlumniDataLoaded(true);
          }
          console.log(alumniData);
        }
      } catch (error) {
        dispatch(editAlumniError());
        console.error("Error:", error);
      }
    };

    if (id) {
      fetchAlumniData();
    } else {
      setAlumniDataLoaded(true);
    }
  }, [id, dispatch]);

  console.log(formData);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (id) {
        const data = await EditAlumni(dispatch, formData);
        if (data) {
          await GetAlumni(dispatch);
          onSubmit(formData);
        }
      } else {
        const data = await AddAlumni(dispatch, formData);
        if (data) {
          await GetAlumni(dispatch);
          onSubmit(formData);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {alumniDataLoaded ? (
        <>
          <div className="mb-3 flex items-center">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <strong style={{ color: "black" }}>
                      <FaUserAlt size={25} className="mx-2" />
                    </strong>
                  </InputAdornment>
                ),
              }}
              sx={{ outline: "none", flex: 1, marginRight: 2 }}
              type="text"
              label="First Name"
              autoComplete="firstname"
              variant="outlined"
              fullWidth
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <strong style={{ color: "black" }}>
                      <FaUserAlt size={25} className="mx-2" />
                    </strong>
                  </InputAdornment>
                ),
              }}
              sx={{ outline: "none", flex: 1 }}
              type="text"
              label="Last Name"
              autoComplete="lastname"
              variant="outlined"
              fullWidth
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <div className="mb-3 flex items-center">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <strong style={{ color: "black" }}>
                      <Badge size={25} className="mx-2" />
                    </strong>
                  </InputAdornment>
                ),
              }}
              sx={{ outline: "none", flex: 1 }}
              type="text"
              placeholder="USC ID Number"
              label="USC ID Number"
              variant="outlined"
              autoComplete="IdNum"
              fullWidth
              required
              value={formData.idNum}
              onChange={(e) =>
                setFormData({ ...formData, idNum: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <InputLabel htmlFor="program">Program</InputLabel>
            <Select
              id="program"
              value={formData.programDescription || ""}
              onChange={(e) => {
                const selectedProgramDescription = e.target.value;
                const selectedProgram = programs.find(
                  (program) =>
                    program.description === selectedProgramDescription,
                );
                if (selectedProgram) {
                  let educationalLevel = "Bachelor";
                  if (selectedProgramDescription.startsWith("Master")) {
                    educationalLevel = "Master";
                  } else if (selectedProgramDescription.startsWith("Doctor")) {
                    educationalLevel = "Doctor";
                  }
                  setFormData({
                    ...formData,
                    programDescription: selectedProgram.description,
                    programCode: selectedProgram.code,
                    educationLevel: educationalLevel,
                  });
                }
              }}
              variant="outlined"
              fullWidth
              required
            >
              {programs.map((program) => (
                <MenuItem key={program.description} value={program.description}>
                  {program.description}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="mb-3 flex items-center">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <strong style={{ color: "black" }}>
                      <MdCalendarMonth size={25} className="mx-2" />
                    </strong>
                  </InputAdornment>
                ),
              }}
              sx={{ outline: "none", flex: 1 }}
              type="number"
              placeholder="Input a number only"
              label="Year Graduated"
              variant="outlined"
              autoComplete="yearGraduate"
              fullWidth
              required
              value={formData.syGraduated}
              onChange={(e) =>
                setFormData({ ...formData, syGraduated: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            style={{
              display: "block",
              width: "100%",
              padding: "15px",
              marginTop: "2rem",
              backgroundColor: "#221769",
              color: "#FFFFFF",
            }}
          >
            {submitting ? "Submitting..." : id ? "Update Alumni" : "Add Alumni"}
          </Button>
        </>
      ) : (
        <p>Loading announcement data...</p>
      )}
    </form>
  );
};

export default AlumniForm;
