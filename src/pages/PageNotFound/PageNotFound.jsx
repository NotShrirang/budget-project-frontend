import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col min-h-[100vh] mainContainer light:mainContainerLight justify-center items-center relative overflow-hidden px-[1rem]">
        <div className="titleRed">404</div>
        <div className="primaryText light:primaryTextLight text-[2rem] text-center">
          The page you are looking for doesn't exist or has been recently moved
          :(
        </div>
        <div>
          <button
            onClick={() => {
              navigate(`/dashboard`);
            }}
            className="primaryButton light:primaryButtonLight mt-8 px-[4rem] py-[1.5rem] relative z-10"
          >
            Return Home?
          </button>
        </div>
        <div className="gradCircle -bottom-[20rem] -left-[10rem]"></div>
        <div className="gradCircle -top-[20rem] -right-[10rem]"></div>
      </div>
    </>
  );
};

export default PageNotFound;
