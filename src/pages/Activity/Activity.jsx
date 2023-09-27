import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Config from "../../utils/config";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/login");
    }
    axios
      .get(Config.getActivities, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setActivities(res.data.data);
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
    navigate(`/activities/${row.id}/`);
  };

  return (
    <div
      className="flex flex-col h-[91vh] mainContainer min-h-[91vh] light:mainContainerLight justify-start items-start 
                relative overflow-hidden p-[2rem]"
    >
      <div className="flex flex-col w-[100%]">
        <div className="titleBlack">Activities</div>
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
              rows={activities}
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

export default Activity;
