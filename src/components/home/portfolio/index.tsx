import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { add, find, floor, takeRight } from "lodash";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { motion } from "framer-motion";
import { GlobalContext } from "@/app/state/global";
import { addCommas } from "@/utils/helper";
import { ProfitIcon } from "@/components/Icons";
import Line from "./line";
import Detail from "./detail";

import styles from "./index.module.css";

const PortfolioList = ({ title, type, subTitle }: any) => {
  const params = useSearchParams();
  const assetId = params.get("assetId") || "";
  const { userShares, productsList, setPage } = useContext(GlobalContext);
  const [selectShare, setSelectShare] = useState<any>(null);

  useEffect(() => {
    if (assetId) {
      const curProduct: any = find(
        productsList,
        (product) => product?.id === assetId
      );
      const curShare: any = find(
        userShares,
        (share) => share.productId === assetId
      );
      setSelectShare({ ...curShare, ...curProduct });
    } else {
      setSelectShare(null);
    }
  }, [assetId, userShares.length, productsList.length]);

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
            <div
              className={styles.portfolioItem}
              key={`portfolio-item-${i}`}
              onClick={() => {
                if (!productsList?.length) return;
                // setSelectShare({ ...item, ...curProduct });
                setPage(`assetId=${item.productId}`);
              }}
            >
              {productsList?.length > 0 ? (
                <>
                  <div className={styles.activityDetail}>
                    <div className={styles.detailName}>
                      <img src={curProduct.icon}></img>
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
                    <Line product={item} />
                  </div>
                </>
              ) : (
                <Skeleton className={styles.skeleton}></Skeleton>
              )}
            </div>
          );
        })}
      </div>

      <motion.div
        className={styles.detailWrap}
        initial={{ left: "100%" }}
        animate={{
          left: !!selectShare ? 0 : "100%",
        }}
        transition={{ duration: 0.2 }}
      >
        {selectShare ? (
          <Detail shareDetail={selectShare} onClose={() => setPage("")} />
        ) : null}
      </motion.div>
    </div>
  ) : null;
};

export default PortfolioList;
