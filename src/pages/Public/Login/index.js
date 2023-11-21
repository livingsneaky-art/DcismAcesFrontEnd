import React, { useState } from "react";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../../services/authentication";
import { NavLink } from "react-router-dom";
import placeholder from "../../../assets/capstole.png";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import FormWithHeader from "../../../components/formheader/index.js";
import { clearMessage } from "../../../app/authenticationSlice";

const Login = () => {
  const { message } = useSelector((state) => state.authentication);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormWithHeader imageSrc={placeholder}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          SignIn(dispatch, { Email, Password });
        }}
      >
        <div className="mb-3 flex items-center">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <strong style={{ color: "black" }}>
                    <FaEnvelope size={25} className="mx-2" />
                  </strong>
                </InputAdornment>
              ),
            }}
            sx={{ outline: "none", flex: 1 }}
            type="email"
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
                  <strong style={{ color: "black" }}>
                    <FaLock size={25} className="mx-2" />
                  </strong>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  {showPassword ? (
                    <FaEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-[18px]"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-[18px]"
                    />
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
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && (
          <Typography className="text-red-500 mx-4">{message}</Typography>
        )}
        <div className="flex text-sm my-4">
          <p>
            Forgot Password?
            <span className="text-[15px] ml-2">
              <NavLink to="/forgotpassword" className="text-second underline">
                Click Here
              </NavLink>
            </span>
          </p>
        </div>
        <Button
          type="submit"
          variant="contained"
          style={{
            display: "block",
            width: "100%",
            backgroundColor: "#030F4B",
            padding: "15px",
          }}
        >
          Login
        </Button>
        <Typography
          sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}
        >
          Don't have an account? Register as
          <span className="text-second underline px-2">
            <NavLink
              to="/signup/alumni"
              onClick={() => dispatch(clearMessage())}
            >
              Alumni
            </NavLink>
          </span>
          or
          <span className="text-second underline px-2">
            <NavLink
              to="/signup/company"
              onClick={() => dispatch(clearMessage())}
            >
              Company
            </NavLink>
          </span>
        </Typography>
      </form>
    </FormWithHeader>
  );
};

export default Login;
