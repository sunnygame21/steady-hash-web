"use client";
import React, { useContext, useState } from "react";
import { add, find, floor } from "lodash";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { GlobalContext } from "@/app/state/global";
import { addCommas } from "@/utils/helper";
import { ProfitIcon } from "@/components/Icons";
import icon from "@/images/home/item1.png";
import Line from "./line";

import styles from "./index.module.css";

const PortfolioList = ({ title, type, subTitle }: any) => {
  const { userShares, productsList } = useContext(GlobalContext);
  return userShares.length > 0 ? (
    <div className={styles.portfolioWrap}>
      <p className={styles.title}>
        {title}
        <span>&ensp;{subTitle}</span>
      </p>
      <div className={styles.portfolioList}>
        {userShares.map((item, i) => {
          const curProduct: any = find(
            productsList,
            (product) => product?.id === item?.productId
          );
          const profit = find(item?.data || [], (cur) => {
            return (
              moment().local().subtract(1, "days").format("YYYY-MM-DD") ===
              moment(cur.date).format("YYYY-MM-DD")
            );
          });
          return (
            <div className={styles.portfolioItem} key={`portfolio-item-${i}`}>
              {productsList?.length > 0 ? (
                <>
                  <div className={styles.activityDetail}>
                    <div className={styles.detailName}>
                      <img src={icon.src}></img>
                      <div className={styles.nameInfo}>
                        <p>{curProduct?.name}</p>
                        <p>By SteadyHash</p>
                        {/* <p>#{curProduct?.code}</p> */}
                      </div>
                    </div>
                    <p className={styles.money}>
                      ${addCommas(item?.shareAmount + item?.profit)}
                    </p>
                    <p className={styles.profit}>
                      <ProfitIcon />+
                      {floor((item.profit / item.shareAmount) * 100, 2)}%
                      {profit?.profit
                        ? `(+${floor(
                            (Number(profit?.profit) / item.shareAmount) * 100,
                            2
                          )}%)`
                        : ""}
                    </p>
                  </div>
                  <div className={styles.portfolioChart}>
                    {/* <Bar id={`chart-${item.productId}`} data={item.data || []} /> */}
                    {/* {type === ChartType.bar ? <Bar /> : <Line />} */}
                    <Line productId={item.productId} />
                  </div>
                </>
              ) : (
                <Skeleton className={styles.skeleton}></Skeleton>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default PortfolioList;
