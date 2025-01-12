"use client";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/app/state/global";
import { BalanceIcon, CreditIcon, InvestIcon, RevenueIcon } from "../icon";

import styles from "./index.module.css";
import { addCommas } from "@/utils/helper";

const listData = [
  {
    icon: <InvestIcon />,
    text: "Investment",
    key: "allInvest",
  },
  {
    icon: <RevenueIcon />,
    text: "Revenue",
    key: "allProfit",
  },
  {
    icon: <BalanceIcon />,
    text: "Balance",
    key: "balance",
  },
  // {
  //   icon: <CreditIcon />,
  //   text: "Credit",
  //   key: 'Credit'
  // },
];

const Summary = () => {
  const { user } = useContext(GlobalContext);
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
                <p>${addCommas(user?.[item.key])}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
