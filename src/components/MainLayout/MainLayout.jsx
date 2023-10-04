import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Config from "../../utils/config";
import mmcoeLogo from "../../assets/logo.webp";
import styles from "./MainLayout.module.css";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import RowingIcon from "@mui/icons-material/Rowing";
import TextsmsIcon from "@mui/icons-material/Textsms";
import LogoutIcon from "@mui/icons-material/Logout";
import { Home } from "@mui/icons-material";
import Swal from "sweetalert2";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState({});
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
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios
      .get(Config.getUser + `/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  }, []);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    // Are you sure?
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DA0C0C",
      cancelButtonColor: "#000000",
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUserLoggedIn(false);
        navigate("/login");
        toast.success("Logged out successfully");
      } else {
        return false;
      }
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
                      src={mmcoeLogo}
                      alt="logo"
                      className="bg-[#ff0000] w-[40px] h-[40px] p-[4px]"
                    />
                    <div className="logoText light:logoTextLight">MMCOE</div>
                  </div>
                  {/* Nav Items */}
                  {(user.privilege === 2 ||
                    user.privilege === 1 ||
                    user.privilege === 0) && (
                    <NavLink
                      to={`/dashboard/`}
                      className={({ isActive }) =>
                        isActive
                          ? "navItemActive ml-[0.5rem] mt-[3rem]"
                          : "navItem light:navItemLight ml-[0.5rem] mt-[3rem]"
                      }
                    >
                      <Home />
                      <div>Dashboard</div>
                    </NavLink>
                  )}
                  <NavLink
                    to={`/transactions/`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem]"
                        : "navItem light:navItemLight ml-[0.5rem]"
                    }
                  >
                    <NoteAltIcon />
                    <div>Transactions</div>
                  </NavLink>
                  {(user.privilege === 2 ||
                    user.privilege === 1 ||
                    user.privilege === 0) && (
                    <NavLink
                      to={`/activities/`}
                      className={({ isActive }) =>
                        isActive
                          ? "navItemActive ml-[0.5rem]"
                          : "navItem light:navItemLight ml-[0.5rem]"
                      }
                    >
                      <RowingIcon />
                      <div>Activities</div>
                    </NavLink>
                  )}
                </div>

                {/* Nav Footer */}
                <div>
                  <div
                    className="logoutContainer light:logoutContainerLight"
                    onClick={handleLogout}
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
                      src={mmcoeLogo}
                      alt="logo"
                      className="bg-[#ff0000] w-[40px] h-[40px] p-[4px]"
                    />
                  </div>

                  {/* Nav Items */}
                  {(user.privilege === 2 ||
                    user.privilege === 1 ||
                    user.privilege === 0) && (
                    <NavLink
                      to={`/dashboard`}
                      className={({ isActive }) =>
                        isActive
                          ? "navItemActive w-fit mt-[3rem]"
                          : "navItem light:navItemLight mt-[3rem]"
                      }
                    >
                      <Home />
                    </NavLink>
                  )}
                  <NavLink
                    to={`/transactions`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit"
                        : "navItem light:navItemLight"
                    }
                  >
                    <NoteAltIcon />
                  </NavLink>
                  {(user.privilege === 2 ||
                    user.privilege === 1 ||
                    user.privilege === 0) && (
                    <NavLink
                      to={`/activities`}
                      className={({ isActive }) =>
                        isActive
                          ? "navItemActive w-fit"
                          : "navItem light:navItemLight"
                      }
                    >
                      <RowingIcon />
                    </NavLink>
                  )}
                </div>

                {/* Nav Footer */}
                <div>
                  <div
                    className="logoutContainer light:logoutContainerLight"
                    onClick={handleLogout}
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
              <div className={styles.welcomeEmail}>Welcome {user.email}!</div>
              <TextsmsIcon
                className="text-[#000000] cursor-pointer mr-[1rem]"
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
