import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardCard from "../../components/Card/DashboardCard";
import Config from "../../utils/config";
import formatDate from "../../utils/formatDate";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState({});
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

  const handleRowDoubleClick = (e) => {
    navigate(`/transaction/${e.row.id}/`);
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => {
        return <div className={styles.datagridCell}>{params.value}</div>;
      },
    },
    {
      field: "request_date",
      headerName: "Request Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className={styles.datagridCell}>
            {formatDate(params.value)[0]}
          </div>
        );
      },
    },
    {
      field: "requested_amount",
      headerName: "Requested Amount",
      flex: 1,
      renderCell: (params) => {
        return <div className={styles.datagridCell}>{params.value}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        if (params.value === "pending") {
          return (
            <div className={styles.pending}>
              {params.value.toString().toUpperCase()}
            </div>
          );
        } else if (params.value === "approved") {
          return (
            <div className={styles.approved}>
              {params.value.toString().toUpperCase()}
            </div>
          );
        } else if (params.value === "rejected") {
          return (
            <div className={styles.rejected}>
              {params.value.toString().toUpperCase()}
            </div>
          );
        } else {
          return (
            <div className={styles.datagridCell}>
              {params.value.toString().toUpperCase()}
            </div>
          );
        }
      },
    },
  ];

  return (
    <>
      <div
        className="flex flex-col h-[91vh] mainContainer light:mainContainerLight
                    relative p-[2rem] "
      >
        <div className="flex flex-col">
          <div className="titleBlack">Transactions</div>
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
          <div className="mt-8 rounded-3xl min-h-[40vh]">
            <Box
              m="0 0 0 0"
              sx={{
                border: "2px solid #000",
                borderRadius: "1.25rem",
                width: "100%",
                height: "100%",
                "& .MuiDataGrid-root": {
                  border: "black",
                  fontFamily: "Epilogue",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: "white",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#fff",
                  borderBottom: "2px solid #000",
                  fontWeight: "bold",
                  borderRadius: "1.25rem",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#fff",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "#fff",
                  borderRadius: "1.25rem",
                },
                "& .MuiCheckbox-root": {
                  color: `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid
                checkboxSelection
                rows={requests}
                columns={columns}
                slots={{ Toolbar: GridToolbar }}
                onRowDoubleClick={handleRowDoubleClick}
                sx={{ borderRadius: "1.25rem", cursor: "pointer" }}
              />
            </Box>
          </div>
        </div>
        <div className="gradCircle -right-[0rem] -top-[20rem]"></div>
      </div>
    </>
  );
};

export default Dashboard;
