import React from "react";
import { Link } from "react-scroll";

const Footer = () => {
    return (
        <div className="bg-[#2E2376] bottom-0 w-full text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between p-8 ">
                <div className="flex flex-col text-center md:text-left space-y-8">
                    <div className="justify-between items-center">
                        <p>Logo here</p>
                    </div>
                    <div className="w-full md:w-[290px] flex flex-col space-y-8 pb-8">
                        <p>
                            This is fill in text. It is here temporarily, and will be replaced
                            with the proper text shortly.
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex flex-col ">
                    <p className="font-bold mb-8 ">Home</p>
                    <ul className="space-y-2 hover:cursor-pointer">
                        <li>
                            <Link
                                to="Home"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="Discover"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                            >
                                Discover
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="Explore"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                            >
                                Explore
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="hidden lg:flex flex-col">
                    <p className="font-bold mb-8 ">Features</p>
                    <ul className="space-y-2">
                        <li>
                            <a href="/"> Job Matching </a>
                        </li>
                        <li>
                            <a href="/"> Alumni Directories </a>
                        </li>
                        <li>
                            <a href="/"> Job Application </a>
                        </li>
                    </ul>
                </div>

                <div className="text-center md:text-left space-y-4 mt-4 md:mt-0">
                    <p className="flex flex-col">
                        Unit 123, Block 123 <span>Sample Street, Sample City </span>Country,
                        1234 Zip Code
                    </p>
                    <p className="flex flex-col">
                        Contact Name 1 <span>Contact No, 123 456 7890</span>
                    </p>
                    <p className="flex flex-col">
                        Contact Name 2 <span>Contact No, 123 456 7890</span>
                    </p>
                </div>
            </div>

            <div className="bg-primary bottom-0 p-4 w-full">
                <p className="flex justify-center text-white text-xs">
                    Copyright © 2023. All rights reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
