import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const API_KEY = "8c17983b4cac457349207fb55ae925ad";

export default function Navigation() {
  const [activeItem, setActiveItem] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubItem, setActiveSubItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in when the page is loaded
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedIn);
    };

    // Initial login check
    checkLoginStatus();

    // Add event listener for changes in localStorage
    window.addEventListener("storage", checkLoginStatus);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );

      const data = await response.json();
      if (data.success) {
        // Remove user data from localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("session_id");
        localStorage.removeItem("currentUser");
        setIsLoggedIn(false);
        navigate("/"); // Redirect to homepage after logout
        alert("Logout successful!");
      } else {
        console.error("Logout failed:", data);
        alert("Error logging out. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed due to a network error.");
    }
  };

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
      subItems: ["PopularTv", "Airing Today", "On TV", "Top Rated TvShows"],
    },
    {
      name: "Favorite",
      path: "/favorites",
    },
  ];

  const handleMenuToggle = (name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveSubItem(subItem);
    setActiveItem(subItem); // Update activeItem to the selected subItem
  };

  return (
    <>
      <nav className="flex items-center justify-between text-slate-300 p-6 md:bg-transparent md:relative fixed top-0 left-0 right-0 z-50 h-[70px] bg-gray-900">
        <div className="flex items-center">
          <h1 className="text-3xl mr-12">
            Movie<span className="text-rose-500">Mate</span>
            <p className="text-xs text-center font-light text-slate-500">
              Film Review
            </p>
          </h1>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center gap-6 ml-auto absolute right-6">
            <button
              className="text-white text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "X" : "☰"}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex text-sm lg:text-base gap-6  relative">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative group"
                onMouseEnter={() => {
                  setOpenDropdown(item.name);
                  setActiveItem(item.name);
                }}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.subItems ? (
                  <>
                    <button
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
                      onMouseEnter={() => setOpenDropdown(item.name)} // نگه داشتن منو هنگام ورود به dropdown
                      onMouseLeave={() => setOpenDropdown(null)} // بستن منو هنگام خروج از dropdown
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem}>
                          <Link
                            to={`/${subItem
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                            onClick={() => setActiveItem(item.name)} // نگه‌داشتن خط زیر آیتم اصلی
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

        {/* Hamburger Menu for Mobile */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } fixed top-0 right-0 bottom-0 left-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-start text-white text-xl z-40 overflow-y-auto`}
        >
          <button
            className="absolute top-6 right-6 text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            X
          </button>
          <ul className="space-y-6 mt-24 flex flex-col items-center justify-center">
            {menuItems.map((item) => (
              <li key={item.name} className="w-full text-center">
                <button
                  onClick={() => handleMenuToggle(item.name)}
                  className="hover:text-rose-500 w-full"
                >
                  {item.name}
                </button>
                {item.subItems && openDropdown === item.name && (
                  <div className="space-y-4 mt-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem}
                        to={`/${subItem.replace(/\s+/g, "-").toLowerCase()}`}
                        className="block text-gray-400 hover:text-gray-100"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {!isLoggedIn && (
              <div className="space-y-4 mt-8 flex flex-col items-center justify-center">
                <Link to="/login" className="block hover:text-rose-500">
                  Login
                </Link>
                <button
                  onClick={handleLogout}
                  className="block hover:text-rose-500 "
                >
                  Logout
                </button>
                <Link
                  to="/signup"
                  className="block bg-rose-700 px-3 py-2 rounded-3xl hover:bg-rose-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </ul>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <button onClick={handleLogout} className=" hover:text-white ">
                Logout
              </button>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
              <Link
                className="bg-rose-700 px-3 py-2 rounded-3xl hover:bg-rose-800 text-white"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          ) : (
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
                  <li></li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
