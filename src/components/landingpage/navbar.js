import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import React, { useState, useEffect } from 'react';
import { Nav } from "react-bootstrap";

const Navbar = () => {
    const [opened, setOpened] = useState(false);

    const toggleMenu = () => {
        setOpened(!opened);
    };

    const closeMenu = () => {
        setOpened(false);
    };

    useEffect(() => {
        if (opened && window.innerWidth < 1023) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [opened]);

    return (
        <div className="sticky top-0 w-full z-10 bg-primary ">
            <div className=" container mx-auto p-4 hidden md:flex">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-white">Logo here</p>
                </div>
                <div className="hidden md:flex justify-center ml-auto">
                    <ul className="flex p-4 space-x-8 text-white text-bold">
                        <li>
                            <ScrollLink
                                to="Home"
                                spy={true}
                                smooth={true}
                                offset={10}
                                duration={500}
                                className="hover:cursor-pointer"
                            >
                                Home
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="Discover"
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                className="hover:cursor-pointer"
                            >
                                Discover
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="Explore"
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                className="hover:cursor-pointer"
                            >
                                Explore
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="Application"
                                spy={true}
                                smooth={true}
                                offset={10}
                                duration={500}
                                className="hover:cursor-pointer"
                            >
                                Application
                            </ScrollLink>
                        </li>
                    </ul>

                    <div className="flex flex-row gap-4 m-2 ml-6">

                        <NavLink
                            to="/signin"
                            className="flex items-center justify-center border border-[#2E2376] rounded-lg w-[120px] text-main text-bold bg-white"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="flex items-center justify-center border  rounded-lg w-[120px] bg-[#2E2376] text-bold text-white"
                        >
                            Register
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className="container mx-auto p-2 md:hidden">
                <div>
                    <div className="flex flex-row justify-between items-center sticky z-20">
                        <div className="flex">
                            <p className="text-main">Logo here</p>
                        </div>

                        <div>
                            {opened ? (
                                <RxCross2 size={25} onClick={toggleMenu} />
                            ) : (
                                <RxHamburgerMenu size={25} onClick={toggleMenu} color={'white'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`${opened ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-500 ease-in-out fixed top-0 right-0 bg-white flex flex-col h-screen w-full justify-center items-center text-2xl z-10`}
                style={{ transform: opened ? "translateX(0)" : "translateX(100%)" }}
            >
                <div className="flex flex-col items-center text-center">
                    <ul className="flex flex-col p-4 gap-6 text-main text-bold">
                        <li>
                            <ScrollLink
                                to="Home"
                                spy={true}
                                smooth={true}
                                offset={10}
                                duration={500}
                                onClick={closeMenu}
                                className="hover:cursor-pointer"
                            >
                                Home
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="Discover"
                                spy={true}
                                smooth={true}
                                offset={-45}
                                duration={500}
                                onClick={closeMenu}
                                className="hover:cursor-pointer"
                            >
                                Discover
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="Explore"
                                spy={true}
                                smooth={true}
                                offset={-50}
                                duration={500}
                                onClick={closeMenu}
                                className="hover:cursor-pointer"
                            >
                                Explore
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="Application"
                                spy={true}
                                smooth={true}
                                offset={-55}
                                duration={500}
                                onClick={closeMenu}
                                className="hover:cursor-pointer"
                            >
                                Application
                            </ScrollLink>
                        </li>
                    </ul>

                    <div className="flex flex-col gap-4">
                        <NavLink
                            to="/login"
                            className="flex items-center justify-center border border-[#2E2376] rounded-lg w-[120px] text-main text-bold"
                        >
                            Login
                        </NavLink>
                        <Nav
                            to="/login"
                            className="flex items-center justify-center border  rounded-lg w-[120px] bg-[#2E2376] text-bold text-white"
                        >
                            Register
                        </Nav>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Navbar