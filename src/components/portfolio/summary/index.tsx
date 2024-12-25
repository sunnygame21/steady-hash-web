"use client";
import React, { useEffect } from "react";
import { BalanceIcon, CreditIcon, InvestIcon, RevenueIcon } from "../icon";

import styles from "./index.module.css";


const listData = [
  {
    icon: <InvestIcon />,
    text: "Investment",
  },
  {
    icon: <RevenueIcon />,
    text: "Revenue",
  },
  {
    icon: <BalanceIcon />,
    text: "Balance",
  },
  {
    icon: <CreditIcon />,
    text: "Credit",
  },
];
const Summary = () => {
  return (
    <div className={styles.summaryWrap}>
        <div className={styles.title}>Summary</div>
        <div className={styles.listWrap}>
          {listData.map((item, i) => {
            return (
              <div className={styles.itemWrap} key={`summary-item-$${i}`}>
                <div className={styles.icon}> {item.icon}</div>
                <div className={styles.detail}>
                  <p>{item.text}</p>
                  <p>98237e</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default Summary;
