import React from "react";
import placeholder from "../../assets/placeholder.webp";

const AuthImage = () => {
    return (
        <div className="hidden md:flex md:w-[30%] lg:w-[40%]">
            <img
                src={placeholder}
                alt="placeholder"
                className="mb-4 w-full h-full object-cover"
            />
        </div>
    );
};

export default AuthImage;
