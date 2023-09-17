import React from "react";
import { learn } from "../../data/landingdata";

const Learn = () => {
    const data = learn[0];

    return (
        <div className="container mx-auto flex flex-col lg:flex-row py-16 px-2 lg:max-w-[980px] xl:max-w-[1260px]">
            <div className="lg:w-[50%] flex flex-col lg:flex">
                <div className="flex flex-col space-y-8 lg:mx-4 text-justify">
                    <div
                        className=" text-4xl text-main font-bold xl:text-5xl lg:mt-16 "
                        dangerouslySetInnerHTML={{ __html: data.title }}
                    />

                    <div
                        className="text-[18px]"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>
            </div>

            <div className="lg:w-[50%]">
                <img src={data.img} alt="placeholder" className="mb-4" />
            </div>
        </div>
    );
};

export default Learn;
