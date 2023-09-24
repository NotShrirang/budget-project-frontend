import React from "react";
import styles from "./DashboardCard.module.css";

const DashboardCard = ({ title, value }) => {
  return (
    // <div className={styles.borderWrap}>
    <div className={styles.card}>
      <div className="flex flex-col items-center justify-center">
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
    // </div>
  );
};

export default DashboardCard;
