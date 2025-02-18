import React from "react";
import { floor, take } from "lodash";
import { BackBlackIcon, DateIcon } from "@/components/Icons";
import BarCalendarChart from "@/components/multi-chart";
import { addCommas } from "@/utils/helper";
import { CHART_STYLE } from "@/constant";
import { getYesterdayProfit, transBarProfit } from "@/utils/profit";

import styles from "./index.module.css";

const DateType = {
  month: {
    text: "Last 1 Month",
    num: 30,
  },
  halfYear: {
    text: "Last 6 Months",
    num: 180,
  },
  year: {
    text: "Last 1 Year",
    num: 365,
  },
};

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

const Detail = ({ onClose, shareDetail }: any) => {
  const { name, icon, shareAmount, profit, productId } = shareDetail;
  const barData = transBarProfit(shareDetail.data, shareAmount, 7);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <BackBlackIcon className={styles.close} onClick={onClose} />
        <h3 className={styles.head}>Asset Detail </h3>
      </div>
      <div className={styles.shareDetail}>
        <div className={styles.detail}>
          <img src={icon}></img>
          <div className={styles.detailLeft}>
            <p className={styles.name}>{name}</p>
            <div className={styles.typeList}>
              <p className={styles.active}>Premium</p>
              <p>HighYield</p>
              <p>3MonthLockup</p>
            </div>
          </div>
        </div>
        {profit ? null : (
          <div className={styles.soon}>
            <DateIcon></DateIcon>
            <span>{`You have a $${addCommas(
              shareAmount
            )} product that will begin accruing interest in 7 to 15 days.`}</span>
          </div>
        )}
        <BarCalendarChart
          chartData={{
            dataList: barData,
            percent: floor(((profit || 0) / shareAmount) * 100, 2),
            yesterPercent: getYesterdayProfit(barData, shareAmount),
            total: addCommas(shareAmount + profit),
            productId: productId,
            detailStyle: CHART_STYLE.product,
          }}
          defaultType="bar"
        ></BarCalendarChart>
        <div className={styles.info}>
          <p className={styles.mainTitle}>Holding Information</p>
          <div className={styles.investItem}>
            <div className={styles.topInfo}>
              <img src={icon} alt="" className={styles.itemImage} />
              <div className={styles.itemRight}>
                <div className={styles.itemDetail}>
                  <p className={styles.itemName}>{name}</p>
                  <p className={styles.desc}>${addCommas(shareAmount)}</p>
                </div>
                <div className={styles.status}>
                  <p className={styles.money}>
                    {floor((profit / shareAmount) * 100, 2)}%
                  </p>
                  <p className={styles.type}>Pnl</p>
                </div>
              </div>
            </div>
            <div className={styles.Hline}></div>
            <div className={styles.investInfo}>
              <div className={styles.infoTitle}>
                <p>Investment (Main Account)</p>
                <p>Profits</p>
              </div>
              <div className={styles.infoNum}>
                <p>${addCommas(shareAmount)}</p>
                <p>${addCommas(profit)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
