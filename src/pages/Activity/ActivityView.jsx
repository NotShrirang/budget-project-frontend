import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Config from "../../utils/config";
import Swal from "sweetalert2";

const ActivityView = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState({});
  const [user, setUser] = useState({});
  const [departments, setDepartments] = useState([]);
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
      .get(Config.getActivities + `${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setActivity(res.data.data);
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
    <div
      className="flex flex-col h-[91vh] mainContainer min-h-[91vh] light:mainContainerLight justify-start items-start 
                relative overflow-hidden p-[2rem]"
    >
      <div className="flex flex-col w-[100%]">
        <div className="titleBlack">Activities Details</div>
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
                  title: "Do you want to update the activity?",
                  text: "Adding activity will deduct amount from department's budget.",
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
                    activity.available_amount = parseInt(
                      activity.available_amount
                    );
                    activity.total_amount = parseInt(activity.total_amount);
                    axios
                      .put(Config.getActivities + `${id}/`, activity, {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      })
                      .then((res) => {
                        toast.success("Activity Updated Successfully!", {
                          position: "top-right",
                          autoClose: 2000,
                          closeOnClick: true,
                          pauseOnHover: true,
                        });
                        Swal.fire("Updated successfully!", "", "success");
                        navigate("/activities");
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
                  value={activity.name}
                  onChange={(e) => {
                    setActivity({ ...activity, name: e.target.value });
                  }}
                  placeholder="Enter activity name"
                />
              </div>
              <div className="inputLight light:inputLight">
                <label>Department</label>
                <select
                  className="inputLight light:inputLight"
                  onChange={(e) => {
                    setActivity({ ...activity, department: e.target.value });
                  }}
                  value={activity.department}
                >
                  {departments.map((dept) => (
                    <option value={dept.id} key={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inputLight light:inputLight">
                <label>Available Amount</label>
                <input
                  type="text"
                  name="m"
                  value={activity.available_amount}
                  onChange={(e) => {
                    setActivity({
                      ...activity,
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
                  value={activity.total_amount}
                  onChange={(e) => {
                    setActivity({
                      ...activity,
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
                    const accessToken = localStorage.getItem("accessToken");
                    Swal.fire({
                      title: "Do you want to delete the activity?",
                      text: "Deleting activity will deduct amount from department's budget.",
                      icon: "warning",
                      input: "text",
                      inputPlaceholder: "Enter activity name to confirm...",
                      showCancelButton: true,
                      confirmButtonText: "Delete",
                      confirmButtonColor: "#DA0C0C",
                      cancelButtonColor: "#000000",
                      focusCancel: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        if (result.value !== activity.name) {
                          Swal.fire(
                            "Incorrect activity name!",
                            "Please make sure you are deleting the correct activity.",
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
                          .delete(Config.getActivities + `${id}/`, {
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                            },
                          })
                          .then((res) => {
                            toast.success("Activity Deleted Successfully!", {
                              position: "top-right",
                              autoClose: 2000,
                              closeOnClick: true,
                              pauseOnHover: true,
                            });
                            Swal.fire("Deleted successfully!", "", "success");
                            navigate("/activities");
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

export default ActivityView;
