import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Config from "../../utils/config";
import Swal from "sweetalert2";

const DepartmentUpdateForm = () => {
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

    axios
      .get(Config.getDepartments + `${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setDepartment(res.data.data);
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
        <div className="titleBlack">Department Details</div>
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
                const accessToken = localStorage.getItem("accessToken");
                Swal.fire({
                  title: "Do you want to update this department?",
                  text: "You cannot undo this action! Please make sure the information is correct.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Update",
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
                    axios
                      .put(Config.getDepartments + `${id}/`, department, {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      })
                      .then((res) => {
                        toast.success("Department Updated Successfully!", {
                          position: "top-right",
                          autoClose: 2000,
                          closeOnClick: true,
                          pauseOnHover: true,
                        });
                        Swal.fire("Updated successfully!", "", "success");
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
                  type="text"
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
                  type="text"
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
                Update
              </button>
              {user.privilege === 1 && (
                <button
                  type="button"
                  className="primaryButton light:primaryButton mt-[2rem] px-[3rem] py-[0.7rem]"
                  onClick={() => {
                    Swal.fire({
                      title: "Do you want to delete this department?",
                      text: "You cannot undo this action! Please make sure you are deleting the correct department.",
                      icon: "warning",
                      input: "text",
                      inputPlaceholder:
                        "Type in the name of the department to confirm deletion.",
                      showCancelButton: true,
                      confirmButtonText: "Delete",
                      confirmButtonColor: "#DA0C0C",
                      cancelButtonColor: "#000000",
                      focusCancel: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        if (result.value !== department.name) {
                          Swal.fire(
                            "Incorrect department name!",
                            "Please make sure you are deleting the correct department.",
                            "error"
                          );
                          return;
                        }
                        const accessToken = localStorage.getItem("accessToken");
                        const userId = localStorage.getItem("userId");
                        if (!accessToken) {
                          navigate("/login");
                        }
                        axios
                          .delete(Config.getDepartments + `${id}/`, {
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                            },
                          })
                          .then((res) => {
                            toast.success("Department Deleted Successfully!", {
                              position: "top-right",
                              autoClose: 2000,
                              closeOnClick: true,
                              pauseOnHover: true,
                            });
                            Swal.fire("Deleted successfully!", "", "success");
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
                  Delete
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentUpdateForm;
