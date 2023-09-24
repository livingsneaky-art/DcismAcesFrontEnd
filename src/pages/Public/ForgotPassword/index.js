import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { resetPassword } from "../../../services/authentication";
import { logout } from '../../../app/authenticationSlice';
import {
    Button,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Publicformheader from "../../../components/formheader/publicformheader";
import placeholder from '../../../assets/capstole.webp';


const ForgotPassword = () => {
    const { isSucceed, message } = useSelector(state => state.authentication)
    const error = useSelector((state) => state.authentication.error)

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    console.log("Here 1: isSucceed:", isSucceed);
    // Add this useEffect to log the value of isSucceed when it changes
    useEffect(() => {
        console.log("Here 2: isSucceed:", isSucceed);
    }, [isSucceed]);

    return (
        isSucceed ? (
            <div>
                <h1>Email Sent! {message}</h1>
                <Button
                    variant="link"
                    href="/signin"
                    onClick={() => {
                        dispatch(logout()); // Dispatch the logout action here
                    }}
                    style={{ marginLeft: '1rem', color: '#000' }}
                >
                    Log out
                </Button>
            </div>
        ) : (
            // Display the message if not successful
            <Publicformheader imageSrc={placeholder} title="Forgot Password?" description="Don't worry. We can help!">
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    resetPassword(dispatch, { email });
                }}>
                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaEnvelope size={25} className="mx-2" />
                                    </InputAdornment>
                                ),
                            }}

                            sx={{ outline: "none", flex: 1 }}
                            placeholder="Email"
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
            </Publicformheader>
        )
    );
};

export default ForgotPassword;
