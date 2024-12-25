"use client";
import React, { useState } from "react";
import EchartLine from "@/components/multi-chart/line";
import { BackIcon } from "@/components/Icons";
import icon from "@/images/home/item1.png";

import styles from "./index.module.css";

const Date = ["Daily", "Weekly", "Monthly"];
const IntroType = [
  {
    key: "Overview",
    text: "Overview",
  },
  {
    key: "Statistics",
    text: "Statistics",
  },
  {
    key: "History",
    text: "History Data",
  },
];

const Detail = ({ onClose }: any) => {
  const [time, setTime] = useState(Date[1]);
  const [type, setType] = useState(IntroType[0]);
  return (
    <div className={styles.wrap}>
      <BackIcon className={styles.close} onClick={onClose} />
      <div className={styles.titleCard}>
        <img src={icon.src} className={styles.itemImage}></img>
        <div className={styles.itemRight}>
          <div className={styles.itemDetail}>
            <p className={styles.name}>
              Steady <span> (#STEADY_4)</span>
            </p>
            <p className={styles.desc}>Earning starts soon, 12-04</p>
          </div>
          <div className={styles.status}>
            <p className={styles.money}>$5,000.00</p>
            <p className={styles.type}>OPEN</p>
          </div>
        </div>
      </div>
      <div className={styles.chartWrap}>
        <div className={styles.chart}>
          <EchartLine></EchartLine>
        </div>
        <div className={styles.times}>
          {Date.map((item) => (
            <div
              key={`product-detail-time-${item}`}
              className={time === item ? styles.timeActive : ""}
              onClick={() => setTime(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.intro}>
        <div className={styles.tabs}>
          {IntroType.map((item) => (
            <div
              key={`product-detail-intro-${item.key}`}
              className={type.key === item.key ? styles.tabActive : ""}
              onClick={() => setType(item)}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className={styles.introDetail}>
          <p className={styles.title}>Flagship 22% - Quant Pioneer Plan</p>
          <div className={styles.detail}>
            <li>
              Annual Yield: 22% Minimum Investment: $20,000 Lock-up Period:
              Minimum of 3 months Type: Quantitative Investment Description:
              This plan leverages advanced AI and quantitative trading
              strategies to maximize returns. Ideal for investors interested in
              innovative financial technologies, it offers a substantial annual
              yield of 22% with a 3-month lock-up period.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
