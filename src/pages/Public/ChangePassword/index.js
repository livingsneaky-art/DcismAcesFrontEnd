import React, { useState } from "react";
import {FaKey} from "react-icons/fa";
import AuthImage from "../../../components/authprops/authImage";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ChangePassword = () => {
    const error = useSelector((state) => state.authenticationSlice.error)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ password, confirmPassword })
    };

    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 mt-10">
            <AuthImage />

            <div className="w-full md:w-[70%] lg:w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <h1 className="text-4xl font-bold text-main">
                    Change <br /> Password
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 flex items-center">

                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <FaKey size={25} className="mx-2" />
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

                    <div className="mb-3 flex items-center">
                        <FaKey size={25} className="mx-2" />
                        <TextField
                            sx={{ outline: "none", flex: 1 }}
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            autoComplete="confirmPassword"
                            fullWidth
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {error && <Typography className="text-red-500 mx-4">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        style={{ display: "block", width: "100%", backgroundColor: "#030F4B", padding: "12px", marginTop: "2rem" }}
                    >
                        Continue
                    </Button>
                    <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                        Remember your password?
                        <span className="text-second underline px-2">
                            <NavLink to="/signin">Back to Login</NavLink>
                        </span>
                    </Typography>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
