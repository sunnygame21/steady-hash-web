"use client";
import React, { useEffect } from "react";
import { ProfitIcon } from "@/components/Icons";
import icon from "/public/home/item1.png";

import styles from "./index.module.css";

const PortfolioList = ({ title }: any) => {
  useEffect(() => {}, []);
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
          <div className={styles.portfolioChart}></div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;
