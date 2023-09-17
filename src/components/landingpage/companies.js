import React from "react";
import { HiCurrencyDollar } from "react-icons/hi";

const Companies = () => {
    return (
        <div className="bg-[#D1D4F4] py-8 p-2" id="Discover">
            <div className="container mx-auto lg:max-w-[980px] xl:max-w-[1260px]">
                <h1 className="text-4xl xl:text-5xl text-main font-bold md:text-center pb-8">
                    Work with Exciting Companies
                </h1>

                <div className="flex flex-col md:flex md:flex-row mx-auto items-center justify-center gap-8">
                    <p className="flex items-center gap-2 text-2xl">
                        <HiCurrencyDollar size={50} /> Company 1
                    </p>
                    <p className="flex items-center gap-2 text-2xl">
                        <HiCurrencyDollar size={50} /> Company 2
                    </p>
                    <p className="flex items-center gap-2 text-2xl">
                        <HiCurrencyDollar size={50} /> Company 3
                    </p>
                    <p className="flex items-center gap-2 text-2xl">
                        <HiCurrencyDollar size={50} /> Company 4
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Companies;
