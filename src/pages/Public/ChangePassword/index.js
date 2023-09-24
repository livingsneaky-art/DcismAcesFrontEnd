import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import Publicformheader from "../../../components/formheader/publicformheader";
import placeholder from '../../../assets/capstole.webp'
import { changePassword } from "../../../services/authentication";
import { logout } from '../../../app/authenticationSlice';
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const ChangePassword = () => {
    const { isSucceed, message } = useSelector((state) => state.authentication);
    const { Token } = useParams();
    const error = useSelector((state) => state.authentication.error)

    const [NewPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

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
            <Publicformheader imageSrc={placeholder} title="ChangePassword" description="Please use a strong combination">
            <form onSubmit={async (event) => {
                    event.preventDefault();
                    changePassword(dispatch, { Token, NewPassword });
                }}>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaKey size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        placeholder="Password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        autoComplete="password"
                        fullWidth
                        required
                        value={NewPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaKey size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ outline: "none", flex: 1 }}
                        placeholder="Confirm Password"
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
                    style={{ display: "block", width: "100%", backgroundColor: NewPassword !== confirmPassword ? "#A9A9A9" : "#030F4B", padding: "12px", marginTop: "2rem", color: "#FFFFFF",}}

                    disabled={NewPassword !== confirmPassword}

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

export default ChangePassword;
