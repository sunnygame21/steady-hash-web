"use client";
import React from "react";
import BarCalendarChart from "@/components/multi-chart";
import Summary from "./summary";
import Holdings from "./holding";

import styles from "./index.module.css";

const Portfolio = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.pageTitle}>Portfolio</div>
      <BarCalendarChart defaultType="calender" />
      <Summary />
      <Holdings />
    </div>
  );
};

export default Portfolio;
