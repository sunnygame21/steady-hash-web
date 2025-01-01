"use client";
import React, { useContext, useState } from "react";
import { bignumber } from "mathjs";
import { add, find } from "lodash";
import { GlobalContext } from "@/app/state/global";
import { addCommas } from "@/utils/helper";
import { ProfitIcon } from "@/components/Icons";
import icon from "@/images/home/item1.png";
import Bar from "./bar";
import Line from "./line";

import styles from "./index.module.css";

const ChartType = {
  bar: "bar",
  line: "line",
};

const PortfolioList = ({ title, type }: any) => {
  const { userShares, productsList, chartLoading } = useContext(GlobalContext);

  console.log("userShares", userShares);
  return userShares.length > 0 ? (
    <div className={styles.portfolioWrap}>
      <p className={styles.title}>{title}</p>
      <div className={styles.portfolioList}>
        {userShares.map((item, i) => {
          const curProduct = find(
            productsList,
            (product) => product?.id === item?.productId
          );
          return (
            <div className={styles.portfolioItem} key={`portfolio-item-${i}`}>
              <div className={styles.activityDetail}>
                <div className={styles.detailName}>
                  <img src={icon.src}></img>
                  <div className={styles.nameInfo}>
                    <p>{curProduct?.name}</p>
                    <p>#{curProduct?.code}</p>
                  </div>
                </div>
                <p className={styles.money}>
                  ${addCommas(Number(add(item?.shareAmount, item?.profit)))}
                </p>
                <p className={styles.profit}>
                  <ProfitIcon />
                  10.78% (+0.11%)
                </p>
              </div>
              <div className={styles.portfolioChart}>
                <Bar id={`chart-${item.productId}`} data={item.data || []} />
                {/* {type === ChartType.bar ? <Bar /> : <Line />} */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default PortfolioList;
