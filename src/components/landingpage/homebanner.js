import React, { useEffect } from "react";
import { homebanner } from "../../data/landingdata";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeBanner = () => {
    const data = homebanner[0];

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="relative" id="Home">
            <img
                src={data.img}
                alt="hero"
                className="w-full h-screen object-cover bg-center md:h-[660px] lg:h-[860px]"
            />
            <div className="absolute top-0 left-0 w-[50%] h-full flex flex-col mt-[250px] md:p-2 lg:ml-[35px] xl:ml-[100px] space-y-4">
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

export default HomeBanner;
