import React from "react";
import { discover } from "../../data/landingdata";

const Discover = () => {
  const data = discover[0];

  return (
    <div className="container mx-auto flex flex-col lg:flex-row py-16 px-2 lg:max-w-[980px] xl:max-w-[1260px]">
      <div className="lg:w-[50%] max-h-[560px]">
        <img src={data.img} alt="placeholder" className="mb-4 object-cover" />
      </div>

      <div className="lg:w-[50%] flex flex-col px-6 lg:flex">
        <div className="flex flex-col space-y-8 lg:mx-4">
          <div
            className=" text-4xl text-main font-bold xl:text-5xl lg:mt-24 "
            dangerouslySetInnerHTML={{ __html: data.title }}
          />

          <div
            className="text-[18px]"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default Discover;
