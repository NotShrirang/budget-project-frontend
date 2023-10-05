import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Config from "../../utils/config";
import Swal from "sweetalert2";

const DepartmentAddForm = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();

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
        if (res.data.privilege === 2) {
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
  }, []);

  return (
    <div
      className="flex flex-col h-[91vh] mainContainer min-h-[91vh] light:mainContainerLight justify-start items-start 
                relative overflow-hidden p-[2rem]"
    >
      <div className="flex flex-col w-[100%]">
        <div className="titleBlack">Add Department</div>
        <div className="flex flex-col mt-[1rem] z-10 min-h-[73vh]">
          <div
            style={{
              display: "flex",
              direction: "row",
              padding: "1rem",
              justifyContent: "space-between",
            }}
          >
            <form
              className="flex flex-col gap-[1rem]"
              onSubmit={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "Do you want to add this department?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Add",
                  confirmButtonColor: "#DA0C0C",
                  cancelButtonColor: "#000000",
                  focusCancel: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    const accessToken = localStorage.getItem("accessToken");
                    const userId = localStorage.getItem("userId");
                    if (!accessToken) {
                      navigate("/login");
                    }
                    department.available_amount = parseInt(
                      department.available_amount
                    );
                    department.total_amount = parseInt(department.total_amount);
                    console.log(department);
                    axios
                      .post(Config.getDepartments, department, {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      })
                      .then((res) => {
                        toast.success("Department Added Successfully!", {
                          position: "top-right",
                          autoClose: 2000,
                          closeOnClick: true,
                          pauseOnHover: true,
                        });
                        Swal.fire("Added successfully!", "", "success");
                        navigate("/departments");
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
                  }
                });
              }}
            >
              <div className="inputLight light:inputLight">
                <label>Name</label>
                <input
                  type="text"
                  name="m"
                  value={department.name}
                  onChange={(e) => {
                    setDepartment({ ...department, name: e.target.value });
                  }}
                  placeholder="Enter department name"
                />
              </div>
              <div className="inputLight light:inputLight">
                <label>Available Amount</label>
                <input
                  type="number"
                  name="m"
                  value={department.available_amount}
                  onChange={(e) => {
                    setDepartment({
                      ...department,
                      available_amount: e.target.value,
                    });
                  }}
                  placeholder="Enter available amount"
                />
              </div>
              <div className="inputLight light:inputLight">
                <label>Total Amount</label>
                <input
                  type="number"
                  name="m"
                  value={department.total_amount}
                  onChange={(e) => {
                    setDepartment({
                      ...department,
                      total_amount: e.target.value,
                    });
                  }}
                  placeholder="Enter total amount"
                />
              </div>

              <button
                type="submit"
                className="primaryButton light:primaryButtonlight mt-[2rem] px-[3rem] py-[0.7rem]"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAddForm;
