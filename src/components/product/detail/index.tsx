"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { find, multiply } from "lodash";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import EchartLine from "@/components/product/line";
import { BackIcon } from "@/components/Icons";
import { GlobalContext } from "@/app/state/global";
import {
  getProfitParams,
  transProfit,
  transProfitPercent,
} from "@/utils/profit";

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

let first = true;

const Detail = ({}: any) => {
  const params = useSearchParams();
  const productId = params.get("productId") || "";
  const { productProfitData, setProductProfitData, productsList, setPage } =
    useContext(GlobalContext);
  const [profitData, setProfitData] = useState<any>([]);
  const [timeType, setTimeType] = useState(DateType.month);
  const [type, setType] = useState(IntroType[0]);

  const [loading, setLoading] = useState(true);

  const detailData: any = find(productsList, (item) => item.id === productId);

  const close = () => {
    setPage("page=product");
  };

  const fetchData = async () => {
    try {
      if (!productId) return;
      setLoading(true);
      let days = timeType.num;
      const { startDate, endDate, daysDifference } = getProfitParams(days);
      console.log(
        "startDate, endDate, daysDifference",
        startDate,
        endDate,
        daysDifference,
        days
      );
      const { success, data = [] } = await fetch(
        `/api/products/daily-profit?startDate=${startDate}&endDate=${endDate}&productId=${productId}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      if (success) {
        const res = transProfitPercent(data, daysDifference, startDate);
        setProfitData(res);
        setProductProfitData({
          ...productProfitData,
          [productId]: {
            ...(productProfitData?.[productId] || {}),
            [timeType.num]: res,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        "get calendar data error",
        error,
        productProfitData?.[productId]?.[timeType.num]
      );
    }
  };

  useEffect(() => {
    if (!productProfitData?.[productId]?.[timeType.num] && productId) {
      fetchData();
    } else {
      setLoading(false);
      setProfitData(productProfitData?.[productId]?.[timeType.num]);
    }
  }, [JSON.stringify(productProfitData), timeType.num, productId]);

  return (
    <motion.div
      className={styles.detailWrap}
      initial={{ left: "100%" }}
      animate={{
        left: productId ? 0 : "100%",
      }}
      transition={{ duration: 0.2 }}
    >
      <BackIcon className={styles.close} onClick={close} />
      {productsList?.length > 0 ? (
        <div className={styles.titleCard}>
          <img src={detailData?.icon} className={styles.itemImage}></img>
          <div className={styles.itemRight}>
            <div className={styles.itemDetail}>
              <p className={styles.name}>
                {detailData?.name}
                {/* <span> ({detailData?.code})</span> */}
              </p>
              <p className={styles.desc}>Earning starts soon</p>
            </div>
            <div className={styles.status}>
              <p className={styles.money}>
                *APR {multiply(detailData?.apr_7day, 100).toFixed(2)}%
              </p>
              <p className={styles.type}>
                <span className={styles.open}>OPEN</span>&ensp;/&ensp;
                <span className={styles.closed}>CLOSED</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className={styles.titleCardSkeleton}></Skeleton>
      )}

      <div className={styles.chartWrap}>
        <div className={styles.chart}>
          {loading ? (
            <Skeleton className={styles.skeleton} />
          ) : (
            <EchartLine data={profitData}></EchartLine>
          )}
        </div>
        {/* <div className={styles.times}>
      {Object.values(DateType).map((item) => (
        <div
          key={`product-detail-time-${item.num}`}
          className={timeType.num === item.num ? styles.timeActive : ""}
          onClick={() => setTimeType(item)}
        >
          {item.text}
        </div>
      ))}
    </div> */}
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
        {productsList?.length > 0 ? (
          <div className={styles.introDetail}>
            <p className={styles.title}>
              {detailData?.name}&ensp;-&ensp;
              {multiply(detailData?.apr_7day, 100).toFixed(0)}%
            </p>
            <div className={styles.detail}>{detailData?.description}</div>
          </div>
        ) : (
          <Skeleton className={styles.introSkeleton}></Skeleton>
        )}
      </div>
    </motion.div>
  );
};

export default Detail;
