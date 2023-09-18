import React, { useState } from "react";
import { FaEnvelope, FaLock, FaBuilding, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import placeholder from '../../../assets/placeholder.webp'
import FormWithHeader from "../../../components/formheader";
import { useDispatch, useSelector } from "react-redux";
import { SignUpAlumni } from "../../../services/authentication";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

const RegisterAlumni = () => {
    const { message } = useSelector((state) => state.authentication)

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [IdNum, setIdNum] = useState("");
    const [Email, setEmail] = useState("");
    const dispatch = useDispatch();


    return (
        <FormWithHeader imageSrc={placeholder}>
            <form onSubmit={event => {
                event.preventDefault();
                if (Password === confirmPassword) {
                    SignUpAlumni(dispatch, { FirstName, LastName, Password, IdNum, Email });
                }
            }}>
                <div className="mb-3 flex items-center">

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaUserAlt size={25} className="mx-2" /></strong>
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
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaUserAlt size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1, marginRight: 2 }}
                        type="text"
                        label="Last Name"
                        autoComplete="lastname"
                        variant="outlined"
                        fullWidth
                        required
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{color: "black"}}><FaEnvelope size={25} className="mx-2" /></strong>
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
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{color: "black"}}><FaBuilding size={25} className="mx-2" /></strong>
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
                        value={IdNum}
                        onChange={(e) => setIdNum(e.target.value)}
                    />
                </div>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{color: "black"}}><FaLock size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="password"
                        placeholder="Password"
                        label="Password"
                        variant="outlined"
                        autoComplete="password"
                        fullWidth
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="password"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        variant="outlined"
                        autoComplete="confirmPassword"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {message && <Typography className="text-red-500 mx-4">{message}</Typography>}

                <Button
                    type="submit"
                    variant="contained"
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "15px",
                        marginTop: "2rem",
                        backgroundColor: Password !== confirmPassword ? "#A9A9A9" : "#030F4B",
                        color: "#FFFFFF",
                    }}
                    disabled={Password !== confirmPassword}
                >
                    Sign Up As Alumni
                </Button>

                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Already have an account?
                    <span className="text-second underline px-2">
                        <NavLink to="/signin">Login</NavLink>
                    </span> or Register as
                    <span className="text-second underline px-2">
                        <NavLink to="/signup/company">Company</NavLink>
                        <NavLink to="/signup/company">Company</NavLink>
                    </span>
                </Typography>
            </form>
        </FormWithHeader>

    );
};

export default RegisterAlumni;