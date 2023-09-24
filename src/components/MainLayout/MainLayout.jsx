import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import dermaLogo from "../../assets/logo.webp";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

import { Avatar } from "flowbite-react";
import defaultPfp from "../../assets/defaultPfp.jpg";
import TextsmsIcon from "@mui/icons-material/Textsms";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkUser = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserLoggedIn(false);
    navigate("/login");
    toast.info("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <>
      <div className="min-h-[100vh] flex ">
        {/* Left Nav */}
        <div className=" relative w-[80px]">
          <div
            className={`${
              isExpanded ? "w-[300px] px-[1rem]" : "w-[80px] items-center"
            } fixed navContainer light:navContainerLight min-h-[100%] flex flex-col justify-between py-[1rem] z-40`}
            onMouseEnter={toggleMenu}
            onMouseLeave={toggleMenu}
          >
            {isExpanded ? (
              <>
                <div>
                  <div className="flex items-center gap-4">
                    <img
                      src={dermaLogo}
                      alt="logo"
                      className="bg-[#FF0000] w-[40px] h-[40px] p-[4px]"
                    />
                    <div className="logoText light:logoTextLight">MMCOE</div>
                  </div>

                  {/* Nav Items */}
                  <NavLink
                    to={`/`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem] mt-[3rem]"
                        : "navItem light:navItemLight ml-[0.5rem] mt-[3rem]"
                    }
                  >
                    <HomeIcon />
                    <div>Home</div>
                  </NavLink>
                  <NavLink
                    to={`/inference`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem]"
                        : "navItem light:navItemLight ml-[0.5rem]"
                    }
                  >
                    <NoteAltIcon />
                    <div>DermacareAI</div>
                  </NavLink>
                  <NavLink
                    to={`/records`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem]"
                        : "navItem light:navItemLight ml-[0.5rem]"
                    }
                  >
                    <DescriptionIcon />
                    <div>Records</div>
                  </NavLink>
                  <NavLink
                    to={`/doctors`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem] p-[2px]"
                        : "navItem light:navItemLight ml-[0.5rem] p-[2px]"
                    }
                  >
                    <GroupsIcon />
                    <div>Doctors</div>
                  </NavLink>
                </div>

                {/* Nav Footer */}
                <div>
                  <div
                    className="logoutContainer light:logoutContainerLight"
                    onClick={logOut}
                  >
                    <LogoutIcon />
                    <div>Logout</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>
                    <img
                      src={dermaLogo}
                      alt="logo"
                      className="bg-[#FF0000] w-[40px] h-[40px] p-[4px]"
                    />
                  </div>

                  {/* Nav Items */}
                  <NavLink
                    to={`/`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit mt-[3rem]"
                        : "navItem light:navItemLight mt-[3rem]"
                    }
                  >
                    <HomeIcon />
                  </NavLink>
                  <NavLink
                    to={`/inference`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit"
                        : "navItem light:navItemLight"
                    }
                  >
                    <NoteAltIcon />
                  </NavLink>
                  <NavLink
                    to={`/records`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit"
                        : "navItem light:navItemLight"
                    }
                  >
                    <DescriptionIcon />
                  </NavLink>
                  <NavLink
                    to={`/doctors`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit p-[2px]"
                        : "navItem light:navItemLight p-[2px]"
                    }
                  >
                    <GroupsIcon />
                  </NavLink>
                </div>

                {/* Nav Footer */}
                <div>
                  <div
                    className="logoutContainer light:logoutContainerLight"
                    onClick={logOut}
                  >
                    <LogoutIcon />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Container */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-[4rem] flex">
            <div className="fixed h-[4rem] w-[100%] pr-[80px] headerContainer light:headerContainerLight py-[1rem] flex justify-end gap-[1rem] items-center z-30">
              <TextsmsIcon
                className="text-[#FF0000] cursor-pointer"
                style={{ fontSize: "2rem" }}
              />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
