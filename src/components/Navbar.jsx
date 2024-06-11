import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="fixed w-full z-10 text-white">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="flex flex-row items-center cursor-pointer">
            <ScrollLink to="home" spy={true} smooth={true} duration={500}>
              <h1 className="text-2xl font-semibold">
                Remera <span className="text-black">Hospital</span>
              </h1>
            </ScrollLink>
          </div>

          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="doctors"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors
            </ScrollLink>
            <ScrollLink
              to="blog"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Blog
            </ScrollLink>
            <Link
              to="/admin"
              className="hover:text-hoverColor bg-white px-4 py-2 rounded-full text-black transition-all cursor-pointer"
            >
              Admin
            </Link>
            <Link
              to="/user"
              className="hover:text-hoverColor bg-white px-4 py-2 rounded-full text-black transition-all cursor-pointer"
            >
              User
            </Link>
          </nav>

          {showForm && <Contact closeForm={closeForm} />}

          <div className="lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </ScrollLink>
          <ScrollLink
            to="services"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </ScrollLink>
          <ScrollLink
            to="doctors"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Doctors
          </ScrollLink>
          <ScrollLink
            to="blog"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
