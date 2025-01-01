"use client";
import React, { useContext, useEffect, useState } from "react";
import { bignumber } from "mathjs";
import { multiply } from "lodash";
import Skeleton from "react-loading-skeleton";
import EchartLine from "@/components/multi-chart/line";
import { BackIcon } from "@/components/Icons";
import { GlobalContext } from "@/app/state/global";
import { getProfitParams, transProfit } from "@/utils/profit";

import styles from "./index.module.css";


const DateType = {
  daily: {
    text: "Daily",
    key: "daily",
  },
  Monthly: {
    text: "Monthly",
    key: "monthly",
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

const Detail = ({ onClose, detailData, show }: any) => {
  const { productProfitData, setProductProfitData } = useContext(GlobalContext);
  const [profitData, setProfitData] = useState<any>([]);
  const [timeType, setTimeType] = useState(DateType.daily);
  const [type, setType] = useState(IntroType[0]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "/api/products/daily-profit";
      let days = 30;
      if (timeType === DateType.Monthly) {
        url = "/api/products/monthly-profit";
        days = 180;
      }
      const { startDate, endDate, daysDifference } = getProfitParams(days);
      const { success, data = [] } = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      if (success) {
        const res = transProfit(data, days, startDate);
        console.log("res", res);
        setProfitData(res);
        setProductProfitData({
          ...productProfitData,
          [detailData?.id]: {
            ...(productProfitData?.[detailData?.id] || {}),
            [timeType.key]: res,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        "get calendar data error",
        error,
        productProfitData?.[detailData?.id]?.[timeType.key]
      );
    }
  };

  useEffect(() => {
    if (!productProfitData?.[detailData?.id]?.[timeType.key]) {
      fetchData();
    } else {
      setProfitData(productProfitData?.[detailData?.id]?.[timeType.key]);
      setLoading(false);
    }
  }, [JSON.stringify(productProfitData), timeType.key]);

  return (
    <div
    // className={styles.wrap}
    // initial={{ transform: "translateX(100vw)" }}
    // animate={{ transform: show ? "translateX(0)" : "translateX(100vw)" }}
    // transition={{ duration: 0.2 }}
    >
      <BackIcon className={styles.close} onClick={onClose} />
      <div className={styles.titleCard}>
        <img src={detailData?.icon} className={styles.itemImage}></img>
        <div className={styles.itemRight}>
          <div className={styles.itemDetail}>
            <p className={styles.name}>
              {detailData?.name} <span> ({detailData?.code})</span>
            </p>
            <p className={styles.desc}>{/* Earning starts soon, 12-04 */}</p>
          </div>
          <div className={styles.status}>
            <p className={styles.money}>
              *APR{" "}
              {multiply(detailData.apr_7day, 100).toFixed(2)}
              %
            </p>
            <p className={styles.type}>
              <span className={styles.open}>OPEN</span>&ensp;/&ensp;
              <span className={styles.closed}>CLOSED</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.chartWrap}>
        <div className={styles.chart}>
          {loading ? (
            <Skeleton className={styles.skeleton} />
          ) : (
            <EchartLine data={profitData}></EchartLine>
          )}
        </div>
        <div className={styles.times}>
          {Object.values(DateType).map((item) => (
            <div
              key={`product-detail-time-${item.key}`}
              className={timeType.key === item.key ? styles.timeActive : ""}
              onClick={() => setTimeType(item)}
            >
              {item.text}
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
