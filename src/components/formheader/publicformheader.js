import React from "react";

const Publicformheader = ({ imageSrc, title, description, children }) => {
  return (
    <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 pt-5 mt-10">
      <div className="hidden md:flex md:w-[30%] lg:w-[40%]">
        <img
          src={imageSrc}
          alt="Cap and stole"
          className="mb-4 w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="w-full md:w-[70%] lg:w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
        <h1 className="text-4xl font-bold text-main">{title}</h1>
        <p className="text-main pb-8">{description}</p>

        {children}
      </div>
    </div>
  );
};

export default Publicformheader;
