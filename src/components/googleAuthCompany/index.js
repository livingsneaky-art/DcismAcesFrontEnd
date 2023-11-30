import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { SignUpGoogleCompany } from "../../services/authentication";
import { useDispatch } from "react-redux";
const role = "COMPANY";

const GoogleAuthAlumni = () => {
  const dispatch = useDispatch();

  const handleSuccess = (credentialResponse) => {
    const receivedCredential = credentialResponse.credential;
    SignUpGoogleCompany(dispatch, receivedCredential, role);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="flex w-full rounded-md shadow-md justify-center border">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <div className="p-2">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuthAlumni;
