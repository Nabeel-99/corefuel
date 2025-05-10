import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import BurgerMenu from "./BurgerMenu";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/authSlice";
import { resetUserSlice } from "../redux/userSlice";
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user?.username);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const categories = ["chest", "back", "shoulders", "legs", "arm", "core"];
  const paths = [
    "/dashboard",
    "/exercise",
    "/calories",
    "/nutrition",
    "/exercise/create",
    "/food",
    "/settings",
    "/form-check",
    "/body-anatomy",
    ...categories.map((cat) => `/anatomy/${cat}`),
    "/anatomy/details/:id",
  ];

  const isWhiteBg = paths.some((path) =>
    location.pathname.startsWith(path.replace(/:\w+/g, ""))
  );

  const logout = () => {
    dispatch(clearUser());
    dispatch(resetUserSlice());
    navigate("/");
  };
  useEffect(() => {
    // handle background scrolling when burger menu is open
    if (isBurgerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isBurgerMenu]);
  const openBurgerMenu = () => {
    setIsBurgerMenu(!isBurgerMenu);
  };
  const closeMenu = () => setIsBurgerMenu(false);
  return (
    <>
      <nav
        className={`flex items-center w-full ${
          isWhiteBg ? "bg-white" : "bg-blue-500 fixed top-0 left-0"
        }`}
      >
        <div className="flex flex-col h-full pt-2 lg:pt-4 w-full">
          <div className="px-4 2xl:container 2xl:mx-auto lg:px-30 pb-2 lg:pb-4 flex items-center justify-between w-full">
            <Link
              to={"/"}
              className={`text-2xl ${
                isWhiteBg ? "text-blue-500" : "text-white"
              }`}
            >
              CoreFuel
            </Link>
            <div className="lg:hidden flex">
              <button
                onClick={openBurgerMenu}
                className="text-2xl border bg-white p-2 rounded-lg border-[#dadada]"
              >
                {isBurgerMenu ? <IoCloseSharp /> : <CiMenuBurger />}
              </button>
            </div>
            {isLoggedIn && location.pathname !== "/signup/username" && (
              <>
                <div className="hidden lg:flex items-center gap-3 text-sm">
                  <p>Hi, {username}</p>
                  <Link
                    to={"/settings"}
                    className="text-blue-500 hover:text-blue-700 font-bold"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="text-blue-500 hover:text-blue-700 font-bold"
                  >
                    Logout
                  </button>
                  <div className="flex items-center gap-1">
                    <p>Follow Us:</p>
                    <Link>
                      <FaInstagram className="text-xl text-[#9d1554]" />
                    </Link>
                    <Link>
                      <FaFacebookSquare className="text-xl text-blue-500" />
                    </Link>
                  </div>
                </div>
              </>
            )}
            {isBurgerMenu && (
              <BurgerMenu
                closeMenu={closeMenu}
                isLoggedIn={isLoggedIn}
                logout={logout}
              />
            )}
          </div>
          {isLoggedIn && location.pathname !== "/signup/username" && (
            <div className="hidden lg:flex px-30  border border-transparent bg-blue-500   w-full">
              <div className="flex items-center gap-2 px-30 xl:px-8 2xl:container 2xl:mx-auto  text-white ">
                <Link
                  className={`hover:bg-white text-nowrap hover:text-blue-500 py-3 px-6 ${
                    location.pathname === "/dashboard"
                      ? "bg-white text-blue-500"
                      : ""
                  }`}
                  to={"/dashboard"}
                >
                  My HOME
                </Link>

                <Link
                  className={`hover:bg-white text-nowrap hover:text-blue-500 py-3 px-6 ${
                    location.pathname === "/exercise"
                      ? "bg-white text-blue-500"
                      : ""
                  }`}
                  to={"/exercise"}
                >
                  EXERCISE
                </Link>

                <Link
                  className={`hover:bg-white text-nowrap hover:text-blue-500 py-3 px-6 ${
                    location.pathname === "/calories"
                      ? "bg-white text-blue-500"
                      : ""
                  }`}
                  to={"/calories"}
                >
                  CALORIE
                </Link>

                <Link
                  className={`hover:bg-white text-nowrap hover:text-blue-500 py-3 px-6 ${
                    location.pathname === "/nutrition"
                      ? "bg-white text-blue-500"
                      : ""
                  }`}
                  to={"/nutrition"}
                >
                  NUTRITION
                </Link>

                <Link
                  className={`hover:bg-white text-nowrap hover:text-blue-500 py-3 px-6 ${
                    location.pathname === "/form-check"
                      ? "bg-white text-blue-500"
                      : ""
                  }`}
                  to={"/form-check"}
                >
                  FORM CHECK
                </Link>
                <Link
                  className={`hover:bg-white text-nowrap hover:text-blue-500 py-3 px-6 ${
                    location.pathname === "/body-anatomy"
                      ? "bg-white text-blue-500"
                      : ""
                  }`}
                  to={"/body-anatomy"}
                >
                  BODY ANATOMY
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
