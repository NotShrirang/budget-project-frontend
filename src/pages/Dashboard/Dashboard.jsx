import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Config from "../../utils/config";
import { toast } from "react-toastify";
import DashboardCard from "../../components/Card/DashboardCard";

const Dashboard = () => {
  const [requestCount, setRequestCount] = useState({});
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/login");
    }
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

    axios
      .get(Config.getRequests, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setRequests(res.data.data);
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

    axios
      .get(Config.getRequestCount, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setRequestCount(res.data.data);
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
  return (
    <div
      className="flex flex-col w-[100%] h-[91vh] mainContainer light:mainContainerLight
                    relative p-[2rem]"
    >
      <div className="flex flex-col">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="titleBlack">Dashboard</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            transition: "all 0.5s ease",
            height: "25vh",
            marginTop: "2rem",
          }}
        >
          <DashboardCard
            title={"Pending Requests"}
            value={requestCount.pending}
          />
          <DashboardCard
            title={"Accepted Requests"}
            value={requestCount.approved}
          />
          <DashboardCard
            title={"Rejected Requests"}
            value={requestCount.rejected}
          />
        </div>
      </div>
      <div className="gradCircle -bottom-[20rem]"></div>
    </div>
  );
};

export default Dashboard;
