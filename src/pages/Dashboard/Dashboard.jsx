import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Config from "../../utils/config";
import { toast } from "react-toastify";
import DashboardCard from "../../components/Card/DashboardCard";
import { ResponsivePie } from "@nivo/pie";

const Dashboard = () => {
  const [requestCount, setRequestCount] = useState({});
  const [requests, setRequests] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

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
        if (res.data.privilege === 3) {
          navigate("/transactions");
        }
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

    axios
      .get(Config.getDepartments, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setDepartments(res.data.data);
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
    <>
      <div
        className="flex flex-col h-[91vh] mainContainer light:mainContainerLight
                    relative p-[2rem]"
      >
        <div className="flex flex-col gap-[1rem] w-[100vh]">
          <div className="titleBlack">Dashboard</div>
          <div className="flex flex-col gap-[1rem] h-[25vh]">
            <div className="flex flex-row gap-[1rem]">
              {departments.map((department) => (
                <div className={styles.card}>
                  <div className={styles.departmentTitle}>
                    {department.name}
                  </div>
                  {department.available_amount}/{department.total_amount}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="titleBlack">Request Status</div>
              <ResponsivePie
                data={[
                  {
                    id: "Pending",
                    value: requestCount.pending,
                    label: "Pending",
                    color: "#b69800",
                  },
                  {
                    id: "Accepted",
                    value: requestCount.accepted,
                    label: "Accepted",
                    color: "#00b698",
                  },
                  {
                    id: "Rejected",
                    value: requestCount.rejected,
                    label: "Rejected",
                    color: "#DA0C0C",
                  },
                ]}
                margin={{ top: 50, bottom: 50 }}
                innerRadius={0.3}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={"#000000"}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                enableArcLabels={false}
                arcLabelsRadiusOffset={0.4}
                arcLabelsSkipAngle={7}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#b69800",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#b69800",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="gradCircle -right-[0rem] -top-[20rem]"></div>
      </div>
    </>
  );
};

export default Dashboard;
