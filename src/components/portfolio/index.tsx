"use client";
import React from "react";
import moment from "moment";
import BarCalendarChart from "@/components/multi-chart";
import PortfolioList from "../home/portfolio";
import Summary from "./summary";
import Holdings from "./holding";

import styles from "./index.module.css";

const today = moment.utc().local().format("YYYY-MM-DD");

const Portfolio = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.pageTitle}>Portfolio</div>
      <BarCalendarChart defaultType="calender" />
      <PortfolioList title={`Holdings`} subTitle={`(P&L of ${today})`} />
      <Summary />
      <Holdings />
    </div>
  );
};

export default Portfolio;
