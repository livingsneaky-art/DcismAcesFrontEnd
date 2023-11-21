import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaUserAlt,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import placeholder from "../../../assets/company.png";
import FormWithHeader from "../../../components/formheader/indexCompany";
import { useDispatch, useSelector } from "react-redux";
import { SignUpCompany } from "../../../services/authentication";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { clearMessage } from "../../../app/authenticationSlice";

const RegisterCompany = () => {
  const { message } = useSelector((state) => state.authentication);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Email, setEmail] = useState("");
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const [passwordError, setPasswordError] = useState("");

  const isMoa = false;
  const fileUpload = null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordPattern.test(Password)) {
    //     setPasswordError(
    //         "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character"
    //     );
    //     return;
    // } else {
    //     setPasswordError("");
    // }
    if (Password === confirmPassword) {
      SignUpCompany(
        dispatch,
        { FirstName, LastName, Password, CompanyName, Email, isMoa },
        fileUpload,
      );
    }
  };

  return (
    <FormWithHeader imageSrc={placeholder}>
      <form onSubmit={handleFormSubmit}>
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
            placeholder="First Name"
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
                  <strong style={{ color: "black" }}>
                    <FaUserAlt size={25} className="mx-2" />
                  </strong>
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
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
                  <strong style={{ color: "black" }}>
                    <FaBuilding size={25} className="mx-2" />
                  </strong>
                </InputAdornment>
              ),
            }}
            sx={{ outline: "none", flex: 1 }}
            type="text"
            placeholder="Company Name"
            label="Company Name"
            variant="outlined"
            autoComplete="CompanyName"
            fullWidth
            required
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
                  {showConfirmPassword ? (
                    <FaEye
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer text-[18px]"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer text-[18px]"
                    />
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {message && (
          <Typography className="text-red-500 mx-4">{message}</Typography>
        )}
        {/* {passwordError && (
                    <Typography className="text-red-500 mx-4">{passwordError}</Typography>
                )} */}

        <Button
          type="submit"
          variant="contained"
          style={{
            display: "block",
            width: "100%",
            padding: "15px",
            marginTop: "2rem",
            backgroundColor:
              Password !== confirmPassword ? "#A9A9A9" : "#030F4B",
            color: "#FFFFFF",
          }}
          disabled={Password !== confirmPassword}
        >
          Sign Up As Company
        </Button>
        <Typography
          sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}
        >
          Already have an account?
          <span className="text-second underline px-2">
            <NavLink to="/signin" onClick={() => dispatch(clearMessage())}>
              Login
            </NavLink>
          </span>{" "}
          or Register as
          <span className="text-second underline px-2">
            <NavLink
              to="/signup/alumni"
              onClick={() => dispatch(clearMessage())}
            >
              Alumni
            </NavLink>
          </span>
        </Typography>
      </form>
    </FormWithHeader>
  );
};

export default RegisterCompany;
