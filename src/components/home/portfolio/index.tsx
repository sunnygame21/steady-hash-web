"use client";
import React from "react";
import { ProfitIcon } from "@/components/Icons";
import icon from "@/images/home/item1.png";
import Bar from "./bar";
import Line from "./line";

import styles from "./index.module.css";

const ChartType = {
  bar: "bar",
  line: "line",
};

const PortfolioList = ({ title, type }: any) => {
  return (
    <div className={styles.portfolioWrap}>
      <p className={styles.title}>{title}</p>
      <div className={styles.portfolioList}>
        <div className={styles.portfolioItem}>
          <div className={styles.activityDetail}>
            <div className={styles.detailName}>
              <img src={icon.src}></img>
              <div className={styles.nameInfo}>
                <p>Steady</p>
                <p>#STEADY_3</p>
              </div>
            </div>
            <p className={styles.money}>$1,897.34</p>
            <p className={styles.profit}>
              <ProfitIcon />
              10.78% (+0.11%)
            </p>
          </div>
          <div className={styles.portfolioChart}>
            {/* <Bar /> */}
            {type === ChartType.bar ? <Bar /> : <Line />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;
