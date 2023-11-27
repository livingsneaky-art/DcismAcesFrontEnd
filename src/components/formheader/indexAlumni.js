import React from "react";
import { Link } from "react-router-dom";
import GoogleAuthAlumni from "../googleAuthAlumni/index";

const FormWithHeader = ({ imageSrc, children }) => {
  return (
    <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 pt-5 mt-10">
      <div className="hidden md:flex md:w-[30%] lg:w-[40%]">
        <img
          src={imageSrc}
          alt="placeholder"
          className="mb-4 w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="w-full md:w-[70%] lg:w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
        <h1 className="text-2xl">
          Welcome to <br />
          <span className="font-extrabold text-main text-3xl cursor-pointer">
            <Link to="/">ACES!</Link>
          </span>
        </h1>
        <GoogleAuthAlumni />
        <div className="flex items-center justify-center">
          <div className="border border-solid border-slate-200 h-px w-1/3"></div>
          <div className="mx-4 text-slate-400">OR</div>
          <div className="border border-solid border-slate-200 h-px w-1/3"></div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormWithHeader;
