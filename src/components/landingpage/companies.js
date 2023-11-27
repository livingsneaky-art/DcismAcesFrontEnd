import React from "react";
import { company } from "../../data/landingdata";

const Companies = () => {
  return (
    <div className="bg-[#D1D4F4] py-8 p-2" id="Discover">
      <div className="container mx-auto lg:max-w-[980px] xl:max-w-[1260px]">
        <h1 className="text-4xl xl:text-5xl text-main font-bold md:text-center sm:text-center pb-8 pr-0">
          Work With Our Partners
        </h1>

        <div className="flex flex-col md:flex md:flex-row mx-auto items-center justify-center gap-12">
          <p className="flex items-center gap-2 max-w-[150px]">
            <img src={company[0].img} alt={company[0].alt} />
          </p>
          <p className="flex items-center gap-2 max-w-[200px]">
            <img src={company[1].img} alt={company[1].alt} />
          </p>
          <p className="flex items-center gap-2 max-w-[200px]">
            <img
              src={company[2].img}
              alt={company[2].alt}
              className="w-auto object-scale-down"
            />
          </p>
          <p className="flex items-center gap-2 max-w-[200px]">
            <img
              src={company[3].img}
              alt={company[3].alt}
              className="flexlg:max-w-200"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Companies;
