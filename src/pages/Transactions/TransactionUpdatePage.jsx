import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Transactions.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Config from "../../utils/config";
import DynamicForm from "./TransactionItemForm";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const TransactionUpdateView = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({});
  const [departments, setDepartments] = useState([]);
  const [content, setContent] = useState({});
  const [user, setUser] = useState({});
  const [isChanged, setIsChanged] = useState(false);
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
        // console.log(res.data);
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
      .get(Config.getRequests + `${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setTransaction(res.data.data);
        console.log(JSON.parse(res.data.data.item));
        setContent(JSON.parse(res.data.data.item));
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
        console.log(res.data.data);
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

  const handleContentChange = (itemName, quantity) => {
    console.log(itemName, quantity);
    setIsChanged(true);
    setContent((content) => ({
      ...content,
      [itemName.toString()]: Number(quantity),
    }));
  };

  const handleRemoveRow = (itemName) => {
    console.log("Function called...");
    const { [itemName]: _, ...rest } = content;
    console.log("rest" + Object.entries(rest));
    setContent(rest);
  };

  const handleUpdate = () => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get(Config.getRequests + `${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data.is_read);
        if (res.data.data.is_read === true) {
          navigate(`/dashboard/`);
          toast.error("Read transaction cannot be updated", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          console.log(content);
          transaction.item = JSON.stringify(content);
          axios
            .put(Config.getRequests + `${id}/`, transaction, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => {
              // console.log(res.data);
              setTransaction(res.data);
              toast.success("Transaction updated successfully!", {
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
        }
      });
  };

  return (
    <div
      className="flex flex-col mainContainer light:mainContainerLight justify-start items-start 
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
          <div className="titleBlack">Update Transaction</div>
          <div
            style={{
              display: "flex",
              flex: "row",
              justifyContent: "space-evenly",
              gap: "1rem",
            }}
          >
            <IconButton
              style={{ zIndex: "10" }}
              onClick={() => navigate(`/transaction/${id}`)}
            >
              <ArrowBackIcon />
            </IconButton>

            {isChanged && (
              <button className={styles.updateButton} onClick={handleUpdate}>
                Update
              </button>
            )}
          </div>
        </div>
        <form
          className="flex flex-col min-w-[100%] gap-[1rem] mt-[2rem]"
          onSubmit={handleUpdate}
        >
          <div className="inputLight light:inputLight">
            <label>Name</label>
            <input
              type="text"
              name="m"
              value={transaction.title}
              onChange={(e) => {
                setIsChanged(true);
                setTransaction({ ...transaction, title: e.target.value });
              }}
              placeholder="Enter transaction title"
            />
          </div>
          <div className="inputLight light:inputLight">
            <label>Department</label>
            <select
              className="inputLight light:inputLight"
              onChange={(e) => {
                setIsChanged(true);
                setTransaction({ ...transaction, department: e.target.value });
              }}
              value={transaction.department}
            >
              {departments.map((dept) => (
                <option value={dept.id} key={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputLight light:inputLight">
            <label>Requested Amount</label>
            <input
              type="number"
              name="m"
              value={transaction.requested_amount}
              onChange={(e) => {
                setIsChanged(true);
                setTransaction({
                  ...transaction,
                  requested_amount: e.target.value,
                });
              }}
              placeholder="Enter available amount"
            />
          </div>
          <div className="inputLight light:inputLight">
            <label>Description</label>
            <textarea
              name="m"
              value={transaction.description}
              wrap="soft"
              rows="5"
              onChange={(e) => {
                setIsChanged(true);
                setTransaction({
                  ...transaction,
                  description: e.target.value,
                });
              }}
              placeholder="Enter available amount"
            />
          </div>
          <DynamicForm
            content={content || {}}
            handleContentChange={handleContentChange}
            handleContentRemove={handleRemoveRow}
          />
        </form>
      </div>
      <div className="gradCircle -right-[0rem] -top-[20rem]"></div>
    </div>
  );
};

export default TransactionUpdateView;
