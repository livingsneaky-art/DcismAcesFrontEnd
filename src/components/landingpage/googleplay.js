import React from "react";
import { googleplay } from "../../data/landingdata";

const GooglePlay = () => {
    const data = googleplay[0];

    return (
        <div className="relative" id="Application">
            <img
                src={data.img}
                alt="hero"
                className="w-full h-screen object-cover bg-center md:h-[660px] lg:h-[860px]"
            />

            <div className="absolute top-0 right-0 w-[50%] h-full flex flex-col mt-[250px] md:p-2 lg:mr-[35px] xl:mr-[100px] space-y-4 items-end text-end">
                <div
                    className="hidden lg:text-5xl md:text-3xl md:flex md:p-2 font-bold "
                    dangerouslySetInnerHTML={{ __html: data.title }}
                />
                <div
                    className="hidden md:flex text-[18px] w-[500px]"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </div>
        </div>
    );
};

export default GooglePlay;
