import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Transactions.module.css";
import axios from "axios";
import Config from "../../utils/config";
import { FormControl, IconButton, Paper } from "@mui/material";
import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddIcCallOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

const FormRow = ({
  index,
  handleRemoveRow,
  content,
  handleContentChange,
  included,
}) => {
  const [items, setItems] = useState(content[0]);
  const [quantity, setQuantity] = useState(content[1]);

  const navigate = useNavigate();
  console.log(
    "InsideRow: " + content + ": " + index + " -> " + items + " " + quantity
  );
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken === null) {
  //     navigate("/login");
  //   }
  //   console.log("InsideRow: " + index + " -> " + content);
  //   setItems(content[0]);
  //   setQuantity(content[1]);
  // }, [index]);

  const handleItemChange = (event) => {
    const newItem = event.target.value;
    setItems(newItem);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
  };

  const handleRowSubmit = (event) => {
    console.log(items, quantity);
    if (items != undefined && quantity != undefined) {
      handleContentChange(items, quantity);
    } else {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <Paper
      elevation={2}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <FormControl
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {console.log("InsideReturn: ", items, quantity)}
        <div className="inputLight light:inputLight">
          <input
            type="text"
            value={items}
            onChange={handleItemChange}
            placeholder="Enter item name"
            required
          />
        </div>
        <div className="inputLight light:inputLight">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter item quantity"
            required
          />
        </div>
      </FormControl>
      <div className="ml-[1rem]">
        <IconButton onClick={() => handleRemoveRow(index, items)}>
          <DeleteIcon />
        </IconButton>
      </div>

      {!included && (
        <div className="ml-[1rem]">
          <IconButton onClick={handleRowSubmit}>
            <Add />
          </IconButton>
        </div>
      )}
    </Paper>
  );
};

const DynamicForm = ({ content, handleContentChange, handleContentRemove }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/login");
    }
    setRows(Object.entries(content));
  }, [content]);

  const handleAddRow = () => {
    console.log(rows);
    setRows([...rows, {}]);
  };

  const handleRemoveRow = (index, itemName) => {
    const updatedRows = rows.filter((_, i) => {
      console.log(i, index);
      return i !== index;
    });
    console.log("updatedRows: " + updatedRows);
    setRows([...updatedRows]);
    handleContentRemove(itemName);
  };

  return (
    <Paper
      elevation={2}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f5f5f5",
        zIndex: 10,
      }}
    >
      {rows.map((row, index) => {
        console.log(index + "->" + row);
        return (
          <FormRow
            key={index}
            index={index}
            handleRemoveRow={handleRemoveRow}
            content={row}
            handleContentChange={handleContentChange}
            included={row[0] !== undefined}
          />
        );
      })}
      <button onClick={handleAddRow} className={styles.updateButton}>
        <Add>Add</Add>
      </button>
    </Paper>
  );
};

export default DynamicForm;
