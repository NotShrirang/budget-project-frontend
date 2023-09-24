import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GradientCircle from "../../components/GradientCircle/GradientCircle";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-[100%] w-[100%] mainContainer min-h-[100vh] light:mainContainerLight justify-center items-center relative overflow-hidden">
        <div className="headerText light:headerTextLight text-center">
          MMCOE Pune
          <br />
          <div className="titleRed">Budget Management Application</div>
        </div>
        <div>
          <button
            onClick={() => {
              navigate(`/login`);
            }}
            className="primaryButton dark:primaryButtonDark mt-8 px-[4rem] py-[1.5rem] relative z-10"
          >
            Get Started
          </button>
        </div>
        <div className="gradCircle -bottom-[20rem]"></div>
      </div>
    </>
  );
};

export default Home;
