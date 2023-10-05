import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Config from "../../utils/config";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import styles from "./Departments.module.css";

const Department = () => {
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
        if (res.data.privilege === 3 || res.data.privilege === 2) {
          navigate("/dashboard");
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

  const handleAddButtonClick = () => {
    navigate("/departments/add");
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: false,
    },
    {
      field: "available_amount",
      headerName: "Amount",
      flex: 1,
      editable: false,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      editable: false,
    },
  ];

  const handleRowDoubleClick = (row) => {
    navigate(`/departments/${row.id}/`);
  };

  return (
    <div
      className="flex flex-col h-[91vh] mainContainer min-h-[91vh] light:mainContainerLight justify-start items-start 
                relative overflow-hidden p-[2rem]"
    >
      <div className="flex flex-col w-[100%]">
        <div
          style={{
            display: "flex",
            direction: "row",
            padding: "1rem",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div className="titleBlack">Departments</div>
          <div
            className={styles.updateButton}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "1rem",
              zIndex: "10",
            }}
            onClick={handleAddButtonClick}
          >
            <Add />
            <div>Add</div>
          </div>
        </div>
        <div className="mt-8 rounded-3xl min-h-[40vh]">
          <Box
            m="0 0 0 0"
            sx={{
              border: "2px solid #000",
              borderRadius: "1.25rem",
              mt: "3rem",
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
              rows={departments}
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
  );
};

export default Department;
