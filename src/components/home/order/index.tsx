"use client";
import React, { useEffect } from "react";
import { ProfitIcon } from "@/components/Icons";
import icon from "/public/home/item1.png";

import styles from "./index.module.css";

const Orders = () => {
  useEffect(() => {}, []);
  return (
    <div className={styles.orderWrap}>
         <p className={styles.title}>Orders</p>
       <div className={styles.orderList}>
      <div className={styles.orderItem}>
        <img src={icon.src} className={styles.itemImage}></img>
        <div className={styles.itemRight}>
          <div className={styles.itemDetail}>
            <p className={styles.name}>Steady <span> (#STEADY_4)</span></p>
            <p className={styles.desc}>Earning starts soon, 12-04</p>
          </div>
          <div className={styles.status}>
            <p className={styles.money}>$5,000.00</p>
            <p className={styles.type}>Buy</p>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Orders;