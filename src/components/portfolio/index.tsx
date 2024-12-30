"use client";
import React from "react";
import BarCalendarChart from "@/components/multi-chart";
import PortfolioList from "../home/portfolio";
import Summary from "./summary";
import Holdings from "./holding";

import styles from "./index.module.css";

const Portfolio = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.pageTitle}>Portfolio</div>
      <BarCalendarChart defaultType="calender" />
      <PortfolioList title={"Holdings (P&L of 2024-12-05)"} />
      <Summary />
      {/* <Holdings /> */}
    </div>
  );
};

export default Portfolio;
