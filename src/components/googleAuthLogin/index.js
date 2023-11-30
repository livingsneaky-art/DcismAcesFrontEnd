import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { LoginGoogle } from "../../services/authentication";
import { useDispatch } from "react-redux";

const GoogleAuthLogin = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full rounded-md shadow-md justify-center border">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <div className="p-2">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              LoginGoogle(dispatch, credentialResponse.credential)
            }
            // onSuccess={credentialResponse => {
            //     console.log(credentialResponse);
            //   }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuthLogin;
