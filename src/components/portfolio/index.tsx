"use client";
import React from "react";
import PortfolioList from "../home/portfolio";

import BarCalendarChart from "@/components/multi-chart";

import styles from "./index.module.css";



const Portfolio = () => {

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Portfolio</div>
      <BarCalendarChart defaultType='calender' />
      <PortfolioList title={"Holdings (P&L of 2024-12-05)"} />
    </div>
  );
};

export default Portfolio;
