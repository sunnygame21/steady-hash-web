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

const Detail = ({ onClose, detailData }: any) => {
  const [time, setTime] = useState(Date[1]);
  const [type, setType] = useState(IntroType[0]);
  return (
    <div className={styles.wrap}>
      <BackIcon className={styles.close} onClick={onClose} />
      <div className={styles.titleCard}>
        <img src={detailData?.icon} className={styles.itemImage}></img>
        <div className={styles.itemRight}>
          <div className={styles.itemDetail}>
            <p className={styles.name}>
              {detailData?.name} <span> ({detailData?.code})</span>
            </p>
            <p className={styles.desc}>
            {/* Earning starts soon, 12-04 */}
            </p>
          </div>
          <div className={styles.status}>
            <p className={styles.money}>*APR 22%</p>
            <p className={styles.type}>
              <span className={styles.open}>OPEN</span>&ensp;/&ensp;
              <span className={styles.closed}>CLOSED</span>
            </p>
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
        {/* <div className={styles.tabs}>
          {IntroType.map((item) => (
            <div
              key={`product-detail-intro-${item.key}`}
              className={type.key === item.key ? styles.tabActive : ""}
              onClick={() => setType(item)}
            >
              {item.text}
            </div>
          ))}
        </div> */}
        <div className={styles.introDetail}>
          <p className={styles.title}>Flagship 22% - Quant Pioneer Plan</p>
          <div className={styles.detail}>
            <li>{detailData?.description}</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
