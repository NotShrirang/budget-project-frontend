import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Config from "../../utils/config";
import { toast } from "react-toastify";
import DashboardCard from "../../components/Card/DashboardCard";
import Plot from "react-plotly.js";
// import { ResponsivePie } from "@nivo/pie";

const Dashboard = () => {
  const [requestCount, setRequestCount] = useState({});
  const [requests, setRequests] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [user, setUser] = useState({});
  const [requestByActivity, setRequestByActivity] = useState([]);

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

    axios
      .get(Config.getRequestByActivity, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setRequestByActivity(res.data.data);
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

  var requestStatusData = [
    {
      x: ["Pending", "Accepted", "Rejected"],
      y: [requestCount.pending, requestCount.accepted, requestCount.rejected],
      type: "bar",
    },
  ];

  return (
    <div
      className="flex flex-col h-[100%] mainContainer light:mainContainerLight
                    relative p-[2rem]"
    >
      <div className="flex flex-col gap-[1rem] w-[100">
        <div className="titleBlack">Dashboard</div>
        <div className="flex flex-col gap-[1rem]">
          {/* <Plot
            data={requestStatusData}
            layout={{ width: 320, height: 320, title: "Request Status" }}
          /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              gap: "1rem",
            }}
          >
            {requestByActivity.map((department) => {
              var data = [
                {
                  labels: department.activities.name,
                  values: department.activities.total_amount,
                  type: "pie",
                  sort: false,
                  hole: 0.4,
                },
              ];
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    border: "1px solid #000000",
                    borderRadius: "0.3rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#000000",
                      fontFamily: "Epilogue",
                      marginTop: "1.5rem",
                    }}
                  >
                    {department.department}
                  </div>
                  {user.privilege === 1 && (
                    <Plot
                      data={data}
                      layout={{
                        width:
                          (window.innerWidth / requestByActivity.length) * 0.85,
                        height:
                          (window.innerWidth / requestByActivity.length) * 0.7,
                        showlegend: false,
                        margin: {
                          l: 20,
                          r: 20,
                          b: 20,
                          t: 20,
                        },
                      }}
                    />
                  )}
                  {user.privilege === 2 && (
                    <Plot
                      data={data}
                      layout={{
                        width:
                          (window.innerWidth / requestByActivity.length) * 0.2,
                        height:
                          (window.innerWidth / requestByActivity.length) * 0.15,
                        showlegend: false,
                        margin: {
                          l: 20,
                          r: 20,
                          b: 20,
                          t: 20,
                        },
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-row gap-[1rem] content-between">
            {departments.map((department) => (
              <div className={styles.card}>
                <div className={styles.departmentTitle}>{department.name}</div>
                <div className={styles.departmentText}>
                  Total amount - ₹{department.total_amount}
                  <br />
                  Available amount - ₹{department.available_amount}
                  <br />
                  Spent amount - ₹
                  {department.total_amount - department.available_amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gradCircle -right-[0rem] -top-[20rem]"></div>
    </div>
  );
};

export default Dashboard;
