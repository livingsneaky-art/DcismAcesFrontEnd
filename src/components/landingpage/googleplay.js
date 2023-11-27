import React from "react";
import { googleplay } from "../../data/landingdata";

const GooglePlay = () => {
  const data = googleplay[0];

  return (
    <div className="relative" id="Application">
      <img
        src={data.img}
        alt="hero"
        className="w-full h-screen object-cover bg-center md:h-[500px] lg:h-[4=500px]"
      />

      <div className="absolute top-0 right-0 w-[50%] h-auto flex flex-col mt-[150px] md:p-2 lg:mr-[35px] xl:mr-[100px] space-y-4 items-end text-end xs:text-center">
        <div
          className="hidden lg:text-5xl md:text-3xl md:flex md:p-2 font-bold "
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
        <div className="hidden md:flex text-[16px] w-[260px] sm:flex xs:flex">
          {data.content}
        </div>
      </div>
    </div>
  );
};

export default GooglePlay;
