import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [activeItem, setActiveItem] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openDropdownMobile, setOpenDropdownMobile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Movies",
      subItems: ["Popular", "Now Playing", "Upcoming", "Top Rated"],
    },
    {
      name: "TvShows",
      subItems: ["PopularTv", "Airing Today", "On TV", "Top Rated"],
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between text-slate-300 p-4 md:bg-transparent md:relative fixed top-0 left-0 right-0 z-50 h-[70px] bg-gray-900">
        <div className="flex items-center">
          <h1 className="text-3xl mr-12">
            Hyper<span className="text-rose-500">Movie</span>
            <p className="text-xs text-center font-light text-slate-500">
              Film Review
            </p>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex text-sm lg:text-base gap-6 uppercase relative">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => setActiveItem(item.name)}
                      className={`relative pb-1 transition-colors ${
                        activeItem === item.name
                          ? "text-white"
                          : "text-gray-400"
                      } hover:text-white`}
                    >
                      {item.name}
                      <span
                        className={`absolute left-0 bottom-0 w-full h-[2px] bg-white transition-transform duration-300 ${
                          activeItem === item.name ? "scale-x-100" : "scale-x-0"
                        } hover:scale-x-100`}
                      ></span>
                    </button>

                    {/* Dropdown */}
                    <ul
                      className={`absolute left-0 top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg transition-all duration-300 p-2 ${
                        openDropdown === item.name
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem}>
                          <Link
                            to={`/${subItem
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                          >
                            {subItem}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`relative pb-1 transition-colors ${
                      activeItem === item.name ? "text-white" : "text-gray-400"
                    } hover:text-white`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    {item.name}
                    <span
                      className={`absolute left-0 bottom-0 w-full h-[2px] bg-white transition-transform duration-300 ${
                        activeItem === item.name ? "scale-x-100" : "scale-x-0"
                      } hover:scale-x-100`}
                    ></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="hover:text-white">
            Login
          </Link>
          <Link
            className="bg-rose-700 px-3 py-2 rounded-3xl hover:bg-rose-800 text-white"
            to="/signup"
          >
            Sign Up
          </Link>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle className="text-white text-2xl" />
            </button>
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg p-2">
                <li>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
