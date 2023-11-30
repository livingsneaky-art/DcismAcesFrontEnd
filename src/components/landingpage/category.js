import React from "react";
import { category } from "../../data/landingdata";

const Category = () => {
  const data = category[0];

  return (
    <div className="bg-[#D1D4F4] py-8 lg:py-0" id="Explore">
      <div className="container mx-auto flex flex-col px-2 ">
        <div className=" flex flex-col lg:flex">
          <div className="flex flex-col space-y-8 lg:mx-4 ">
            <div
              className="text-4xl text-main font-bold xl:text-5xl lg:mt-16 "
              dangerouslySetInnerHTML={{ __html: data.title }}
            />

            <div
              className="text-justify text-[18px]"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        </div>

        <div className="container mx-auto grid lg:grid-cols-3 gap-4 py-16 px-2">
          {data.data.map((item, index) => (
            <div key={index}>
              <div className="relative group">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[100%] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "></div>
              </div>
              <p className="bottom-0 left-0 right-0 text-[18px] text-main text-center py-2 font-bold uppercase">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
