import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../googleauth";

const AuthHeader = () => {
  return (
    <>
      <h1 className="text-2xl">
        Welcome to <br />
        <span className="font-extrabold text-main text-3xl cursor-pointer">
          <Link to="/">ACES!</Link>
        </span>
      </h1>
      <GoogleAuth />
      <div className="flex items-center justify-center">
        <div className="border border-solid border-slate-200 h-px w-1/3"></div>
        <div className="mx-4 text-slate-400">OR</div>
        <div className="border border-solid border-slate-200 h-px w-1/3"></div>
      </div>
    </>
  );
};

export default AuthHeader;
