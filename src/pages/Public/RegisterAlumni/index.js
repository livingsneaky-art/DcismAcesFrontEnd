import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import placeholder from '../../../assets/capstole.png'
import FormWithHeader from "../../../components/formheader/indexAlumni";
import { useDispatch, useSelector } from "react-redux";
import { SignUpAlumni } from "../../../services/authentication";
import { Button, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Badge } from "@mui/icons-material";
import { clearMessage } from "../../../app/authenticationSlice";
import { programs } from "../../../components/constant/helper";

const RegisterAlumni = () => {
    const { message } = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        idNum: "",
        courses: {
            programCode: "",
            programDescription: "",
            educationalLevel: "",
        },
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
        passwordError: "",
    });

    const {
        firstName,
        middleName,
        lastName,
        idNum,
        courses: { programCode, programDescription, educationalLevel },
        email,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        passwordError,
    } = formData;

    const handleFormSubmit = async (e) => {
        e.preventDefault();


        if (password === formData.confirmPassword) {
            SignUpAlumni(dispatch, {
                firstName,
                middleName,
                lastName,
                idNum,
                courses: {
                    programCode,
                    programDescription,
                    educationalLevel,
                },
                email,
                password,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTogglePasswordVisibility = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: !prevData[field],
        }));
    };

    return (
        <FormWithHeader imageSrc={placeholder}>
            <form onSubmit={handleFormSubmit}>

                <div className="mb-3 flex items-center gap-1">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaUserAlt size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        placeholder="First Name"
                        label="First Name"
                        autoComplete="firstName"
                        variant="outlined"
                        fullWidth
                        required
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                    />

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaUserAlt size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1, marginRight: 0 }}
                        type="text"
                        placeholder="Last Name"
                        label="Last Name"
                        autoComplete="lastname"
                        variant="outlined"
                        fullWidth
                        required
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                    />
                </div>


                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><Badge size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        placeholder="USC ID Number"
                        label="USC ID Number"
                        variant="outlined"
                        autoComplete="idNum"
                        fullWidth
                        required
                        name="idNum"
                        value={idNum}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 flex-col items-center">
                    <InputLabel htmlFor="program">Program</InputLabel>
                    <Select
                        id="program"
                        value={programDescription || ''}
                        onChange={(e) => {
                            const selectedProgramDescription = e.target.value;
                            const selectedProgram = programs.find(program => program.description === selectedProgramDescription);
                            if (selectedProgram) {
                                let educationalLevel = "Bachelor";
                                if (selectedProgramDescription.startsWith("Master")) {
                                    educationalLevel = "Master";
                                } else if (selectedProgramDescription.startsWith("Doctor")) {
                                    educationalLevel = "Doctor";
                                }
                                setFormData((prevData) => ({
                                    ...prevData,
                                    courses: {
                                        programCode: selectedProgram.code,
                                        programDescription: selectedProgram.description,
                                        educationalLevel: educationalLevel,
                                    },
                                }));
                            }
                        }}
                        variant="outlined"
                        fullWidth
                        required
                        name="programDescription"
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
                                    <strong style={{ color: "black" }}><FaEnvelope size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        placeholder="Email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        fullWidth
                        required
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaLock size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="start">
                                    {showPassword ? (
                                        <FaEye onClick={() => handleTogglePasswordVisibility('showPassword')} className="cursor-pointer text-[18px]" />
                                    ) : (
                                        <FaEyeSlash onClick={() => handleTogglePasswordVisibility('showPassword')} className="cursor-pointer text-[18px]" />
                                    )}
                                </InputAdornment>
                            ),
                        }}
                        sx={{ outline: "none", flex: 1 }}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        label="Password"
                        variant="outlined"
                        autoComplete="password"
                        fullWidth
                        required
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>



                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaLock size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="start">
                                    {showConfirmPassword ? (
                                        <FaEye onClick={() => handleTogglePasswordVisibility('showConfirmPassword')} className="cursor-pointer text-[18px]" />
                                    ) : (
                                        <FaEyeSlash onClick={() => handleTogglePasswordVisibility('showConfirmPassword')} className="cursor-pointer text-[18px]" />
                                    )}
                                </InputAdornment>
                            ),
                        }}
                        sx={{ outline: "none", flex: 1 }}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        variant="outlined"
                        autoComplete="confirmPassword"
                        fullWidth
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                {message && <Typography className="text-red-500 mx-4">{message}</Typography>}
                {passwordError && (
                    <Typography className="text-red-500 mx-4">{passwordError}</Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "15px",
                        marginTop: "2rem",
                        backgroundColor: password !== confirmPassword ? "#A9A9A9" : "#030F4B",
                        color: "#FFFFFF",
                    }}
                    disabled={password !== confirmPassword}
                >
                    Sign Up As Alumni
                </Button>


                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Already have an account?
                    <span className="text-second underline px-2">
                        <NavLink to="/signin" onClick={() => dispatch(clearMessage())}>Login</NavLink>
                    </span> or Register as
                    <span className="text-second underline px-2">
                        <NavLink to="/signup/company" onClick={() => dispatch(clearMessage())}>Company</NavLink>
                    </span>
                </Typography>
            </form>
        </FormWithHeader >
    );
};

export default RegisterAlumni;

