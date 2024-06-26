import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Config from "../../utils/config";
import styles from "./TransactionsView.module.css";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingIcon from "@mui/icons-material/Pending";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import Swal from "sweetalert2";

const TransactionView = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/login");
    }

    axios
      .get(Config.updateTransactionReadStatus + `${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {})
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
      .get(Config.getRequests + `${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setTransaction(res.data.data);
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
  }, []);

  const handleUpdateButtonClick = () => {
    navigate(`/transactions/${id}/update/`);
  };

  return (
    <div
      className="flex flex-col h-[91vh] mainContainer min-h-[91vh] light:mainContainerLight justify-start items-start 
                    relative overflow-hidden p-[2rem]"
    >
      <div className="flex flex-col min-w-[100%]">
        <div
          style={{
            display: "flex",
            flex: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="titleBlack">Transaction Details</div>
          {user.privilege < 3 &&
            (transaction.status == "requested" ||
              transaction.status == "pending") && (
              <div className="flex flex-row items-center">
                <button
                  className={styles.acceptedButton}
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: `This will deduct the ₹${transaction.requested_amount} from ${transaction.activityName}'s budget`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#000000",
                      confirmButtonText: "Yes",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        axios
                          .post(
                            Config.updateTransactionStatus + `${id}/`,
                            {
                              status: "approved",
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "accessToken"
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            toast.success("Transaction Approved", {
                              position: "top-right",
                              autoClose: 2000,
                              closeOnClick: true,
                              pauseOnHover: true,
                            });
                            navigate("/dashboard");
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
                      } else {
                        return;
                      }
                    });
                  }}
                >
                  Accept
                </button>
                <button
                  className={styles.rejectedButton}
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: `This will reject the transaction.`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#000000",
                      confirmButtonText: "Yes",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        axios
                          .post(
                            Config.updateTransactionStatus + `${id}/`,
                            {
                              status: "rejected",
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "accessToken"
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            toast.success("Transaction Rejected", {
                              position: "top-right",
                              autoClose: 2000,
                              closeOnClick: true,
                              pauseOnHover: true,
                            });
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
                      } else {
                        return;
                      }
                    });
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          {!transaction.is_read && transaction.user == user.id && (
            <button
              className={styles.updateButton}
              onClick={handleUpdateButtonClick}
              disabled={transaction.is_read}
            >
              Update
            </button>
          )}
        </div>
        <div className="flex flex-col mt-[1rem] bg-[#D9D9D9] z-10 min-h-[73vh]">
          <div
            style={{
              display: "flex",
              direction: "row",
              padding: "1rem",
              justifyContent: "space-between",
            }}
          >
            <div className="text-[3.125rem] font-medium">
              {transaction.title}
            </div>
            <div className="text-[3.125rem] font-medium">
              ₹{transaction.requested_amount}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              direction: "row",
              padding: "1rem",
              justifyContent: "space-between",
            }}
          >
            <div className="text-[1.25rem] font-medium">
              {transaction.request_date?.split("T")[0]}
            </div>
            <div className="text-[1.25rem] font-medium">
              By {transaction.userEmail}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              direction: "row",
              padding: "1rem",
              justifyContent: "space-between",
            }}
          >
            {transaction.file && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.open(Config.baseURL + transaction.file, "_blank");
                }}
              >
                <DescriptionIcon />
                <div className="text-[1.5rem] font-medium hover:underline">
                  File
                </div>
              </div>
            )}
            {transaction.status === "pending" && (
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <PendingIcon className={styles.pending} />
                <div className={styles.pending}>
                  {transaction.status?.toUpperCase()}
                </div>
              </div>
            )}
            {transaction.status === "approved" && (
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CheckCircleOutlineIcon className={styles.approved} />
                <div className={styles.approved}>
                  {transaction.status?.toUpperCase()}
                </div>
              </div>
            )}
            {transaction.status === "rejected" && (
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <StopCircleOutlinedIcon className={styles.rejected} />
                <div className={styles.rejected}>
                  {transaction.status?.toUpperCase()}
                </div>
              </div>
            )}
            {transaction.status === "requested" && (
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <PendingIcon />
                <div className="ml-[0.5rem]">
                  {transaction.status?.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          <hr className={styles.hr} />
          <div
            style={{
              display: "flex",
              direction: "row",
              padding: "1rem",
              justifyContent: "space-between",
            }}
          >
            <div className="text-[1.5rem] font-medium">
              Activity: {transaction.activityName}
            </div>
            <div className="text-[1.5rem] font-medium">
              Department: {transaction.departmentName}
            </div>
          </div>
          <div className="text-[1.5rem] font-medium ml-[1rem] mr-[1rem]">
            Description
          </div>
          <div className="text-[1rem] font-normal ml-[1rem] mr-[1rem] mt-[0.5rem] mb-[0.8rem]">
            {transaction.description}
          </div>
          {transaction.note && (
            <>
              <div className="text-[1.5rem] font-medium ml-[1rem] mr-[1rem]">
                Note
              </div>
              <div className="text-[1rem] font-normal ml-[1rem] mr-[1rem] mt-[0.5rem] mb-[0.8rem]">
                {transaction.note}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="gradCircle -right-[0rem] -top-[20rem]"></div>
    </div>
  );
};

export default TransactionView;
