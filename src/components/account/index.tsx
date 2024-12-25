"use client";
import React, { useContext } from "react";
import { GlobalContext } from "@/app/state/global";
import deposit from "@/images/account/deposit.png";
import exchange from  "@/images/account/exchange.png";
import withdraw from  "@/images/account/withdraw.png";
import icon from "@/images/home/item1.png";

import styles from "./index.module.css";

const Account = () => {
  const { user } = useContext(GlobalContext);
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <p className={styles.name}>Hi, {user?.showName} 👋</p>
        <p className={styles.desc}>Account Value</p>
        <p className={styles.money}>$45,950.00</p>
      </div>

      <div className={styles.action}>
        <div className={styles.actionItem} aria-disabled>
          <img src={deposit.src} alt="" />
          <p>Deposit</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.actionItem}>
          <img src={withdraw.src} alt="" />
          <p>Withdraw</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.actionItem}>
          <img src={exchange.src} alt="" />
          <p>Exchange</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.mainTitle}>Your Assets</div>
        <div className={styles.investItem}>
          <div className={styles.topInfo}>
            <img src={icon.src} alt="" className={styles.itemImage} />
            <div className={styles.itemRight}>
              <div className={styles.itemDetail}>
                <p className={styles.name}>
                  Steady <span> (#STEADY_4)</span>
                </p>
                <p className={styles.desc}>Earning starts soon, 12-04</p>
              </div>
              <div className={styles.status}>
                <p className={styles.money}>$5,000.00</p>
                <p className={styles.type}>Buy</p>
              </div>
            </div>
          </div>
          <div className={styles.Hline}></div>
          <div className={styles.investInfo}>
            <div className={styles.infoTitle}>
              <p>Investment</p>
              <p>Profits</p>
            </div>
            <div className={styles.infoNum}>
              <p>$20,000.00</p>
              <p>$3,450.00</p>
            </div>
          </div>
        </div>
        <div className={styles.balance}>
          <div className={styles.infoTitle}>
            <p>Balance</p>
            <p>Available</p>
          </div>
          <div className={styles.infoNum}>
            <p>$20,000.00</p>
            <p>$3,450.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
