import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TransactionsView.module.css";
import axios from "axios";
import Config from "../../utils/config";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import DynamicForm from "./TransactionItemForm";
import { useEffect } from "react";

const TransactionAddForm = () => {
  const [transaction, setTransaction] = useState({});
  const [activities, setActivities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [content, setContent] = useState({});
  const [user, setUser] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken) {
      navigate("/login");
    }
    if (transaction.title == undefined || transaction.title == "") {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    } else {
      transaction.item = JSON.stringify(content);
      transaction.requested_amount = Number(transaction.requested_amount);
      if (user.privilege == 2 || user.privilege == 3) {
        transaction.department = user.department;
      }
      console.log(transaction);
      axios
        .post(Config.getRequests, transaction, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Transaction Added Successfully", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
          });
          navigate("/dashboard/");
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
  };

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

  return (
    <div
      className="flex flex-col w-[100%] h-[91vh] mainContainer light:mainContainerLight
                    relative p-[2rem]"
    >
      <div className="flex flex-col">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="titleBlack">Add Transactions</div>
          {isChanged && (
            <div
              className={styles.updateButton}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: "1rem",
                zIndex: "10",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              <Add />
              <div>Add</div>
            </div>
          )}
        </div>
        <form
          className="flex flex-col min-w-[100%] gap-[1rem] mt-[2rem]"
          onSubmit={handleSubmit}
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
          {(user.privilege == 0 || user.privilege == 1) && (
            <div className="inputLight light:inputLight">
              <label>Department</label>
              <select
                className="inputLight light:inputLight"
                onChange={(e) => {
                  setIsChanged(true);
                  setTransaction({
                    ...transaction,
                    department: e.target.value,
                  });
                }}
                value={transaction.department || ""}
              >
                <option value={undefined} key={undefined}>
                  {"--Select Department--"}
                </option>
                {departments.map((dept) => (
                  <option value={dept.id} key={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="inputLight light:inputLight">
            <label>Activity</label>
            <select
              className="inputLight light:inputLight"
              onChange={(e) => {
                setIsChanged(true);
                setTransaction({ ...transaction, activity: e.target.value });
              }}
              value={transaction.activity || ""}
            >
              <option value={undefined} key={undefined}>
                {"--Select Activity--"}
              </option>
              {activities.map((activity) => (
                <option value={activity.id} key={activity.id}>
                  {activity.name}
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
    </div>
  );
};

export default TransactionAddForm;
