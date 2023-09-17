import React, { useState } from "react";
import {FaEnvelope} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthImage from "../../../components/authprops/authImage";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const ForgotPassword = () => {

    const error = useSelector((state) => state.authenticationSlice.error)

    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ email })
    };

    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 mt-10">
            <AuthImage />

            <div className="w-full md:w-[70%] lg:w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <h1 className="text-4xl font-bold text-main">
                    Forgot <br /> Password?
                </h1>
                <p className="text-main pb-8">Dont worry. We can help</p>

                <form onSubmit={handleSubmit}>
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

export default ForgotPassword;
