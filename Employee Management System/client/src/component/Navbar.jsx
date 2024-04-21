import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ isAuthenticated, setisAuthenticated }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:800px)");
    setIsMobile(mediaQuery.matches);
    const handleonchange = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleonchange);
    return () => {
      mediaQuery.removeEventListener("change", handleonchange);
    };
  }, []);
  const handleonlogout = () => {
    const answer = confirm("Are you sure to log out?");
    if (answer) {
      localStorage.removeItem("token");
      setisAuthenticated(false);
      isMobile && setToggle(false);
      Navigate("/Login");
    }
  };
  return (
    <div className="fixed top-0 z-30 w-[100%]">
      <nav className="bg-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                {/* Replace with your logo */}
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <span className="text-gray-300 px-3 py-2 rounded-md text-lg font-medium">
                Employee Management{" "}
              </span>
              {/* Navigation Links */}
              <div
                className={`${
                  isMobile &&
                  toggle &&
                  "transition-all w-full absolute top-[63px] bg-gray-800 right-0 pb-3"
                }`}
              >
                <div
                  className={` flex transition-all ${
                    isMobile
                      ? toggle
                        ? "flex-col items-center w-full h-auto "
                        : "w-0 overflow-hidden h-0"
                      : " flex-row ml-10 space-x-4"
                  } `}
                >
                  {/*  navigation links here */}
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        <span onClick={() => isMobile && setToggle(false)}>
                          Dashboard
                        </span>
                      </Link>
                      <Link
                        to="/Employee/add"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        <span onClick={() => isMobile && setToggle(false)}>
                          Add Employee
                        </span>
                      </Link>
                      <Link
                        to="/Employee/Edit"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        <span onClick={() => isMobile && setToggle(false)}>
                          Edit Employee
                        </span>
                      </Link>
                      <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        <span onClick={handleonlogout}>Log Out</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/Login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <span onClick={() => isMobile && setToggle(false)}>
                        Login
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
                onClick={() => (toggle ? setToggle(false) : setToggle(true))}
              >
                <i className={`${toggle ? "fa fa-close" : "fa fa-bars"}`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
