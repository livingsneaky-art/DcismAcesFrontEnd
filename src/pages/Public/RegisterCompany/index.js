
import React, { useState } from "react";
import {FaEnvelope, FaLock, FaUserAlt, FaBuilding, FaRegAddressCard} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthImage from "../../../components/authprops/authImage";
import AuthHeader from "../../../components/authprops/authHeader";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../../../services/authentication";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

const RegisterCompany = () => {
    const error = useSelector((state) => state.authenticationSlice.error);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");


    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        SignUp(dispatch, { username, password, name, companyName, email })

    };
    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 pt-5 mt-10">
            <AuthImage />
            <div className="w-full md:w-[70%] lg:w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <AuthHeader />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <FaUserAlt size={25} className="mx-2" />
                                    </InputAdornment>
                                ),
                            }}

                            sx={{ outline: "none", flex: 1 }}
                            type="text"
                            label="Username"
                            variant="outlined"
                            autoComplete="username"
                            fullWidth
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <FaRegAddressCard size={25} className="mx-2" />
                                    </InputAdornment>
                                ),
                            }}

                            sx={{ outline: "none", flex: 1 }}
                            type="text"
                            label="Name of Representative (Last Name, First Name)"
                            autoComplete="name"
                            variant="outlined"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 flex items-center">

                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <FaBuilding size={25} className="mx-2" />
                                    </InputAdornment>
                                ),
                            }}

                            sx={{ outline: "none", flex: 1 }}
                            type="text"
                            label="Company Name"
                            autoComplete="companyName"
                            variant="outlined"
                            fullWidth
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <FaEnvelope size={25} className="mx-2" />
                                    </InputAdornment>
                                ),
                            }}

                            sx={{ outline: "none", flex: 1 }}
                            type="email"
                            label="Email"
                            variant="outlined"
                            autoComplete="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <FaLock size={25} className="mx-2" />
                                    </InputAdornment>
                                ),
                            }}

                            sx={{ outline: "none", flex: 1 }}
                            type="password"
                            label="Password"
                            variant="outlined"
                            autoComplete="password"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <Typography className="text-red-500 mx-4">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        style={{ display: "block", width: "100%", backgroundColor: "#030F4B", padding: "15px", marginTop: "2rem" }}
                    >
                        Sign Up As Company
                    </Button>
                    <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                        Already have an account?
                        <span className="text-second underline px-2">
                            <NavLink to="/signin">Login</NavLink>
                        </span>
                    </Typography>
                </form>
            </div>
        </div>
    );
};

export default RegisterCompany;


