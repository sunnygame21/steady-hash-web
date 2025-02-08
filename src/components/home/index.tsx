import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { floor } from "lodash";
import { motion } from "framer-motion";
import { GlobalContext } from "@/app/state/global";
import { getYesterdayProfit, transBarProfit } from "@/utils/profit";
import { addCommas } from "@/utils/helper";
import { AccountIcon, CartIcon } from "../Icons";
import BarCalendarChart from "../multi-chart";
import Products from "../product";
import PortfolioList from "./portfolio";

import styles from "./index.module.css";

const Home = () => {
  const params = useSearchParams();
  const page = params.get("page");
  const { user, productsList, sevenDaysSumData, setPage } =
    useContext(GlobalContext);
  const [product, setProduct] = useState(false);
  const [manage, setManage] = useState(false);

  useEffect(() => {
    setProduct(page === "product");
    setManage(page === "manage");
  }, [page]);

  if (!user?.id) return null;


  return (
    <div className={styles.wrap}>
      <div className={styles.info}>
        <p className={styles.name}>Hi, {user?.showName} 👋</p>
        <p className={styles.welcome}>Welcome back to SteadyHash!</p>
      </div>

      <BarCalendarChart
        defaultType="bar"
        chartData={{
          dataList: transBarProfit(sevenDaysSumData, user.allInvest, 7),
          percent: floor(((user.allProfit || 0) / user.allInvest) * 100, 2),
          yesterPercent: getYesterdayProfit(sevenDaysSumData, user.allInvest),
          total: addCommas(user.allMoney),
        }}
      />

      {productsList.length > 0 ? (
        <div className={styles.btn}>
          <div
            className={styles.exploreBtn}
            onClick={() => {
              setPage("page=product");
              setProduct(true);
            }}
          >
            <CartIcon />
            Explore
          </div>
          <div className={styles.holderBtn} onClick={() => setManage(true)}>
            <AccountIcon />
            Manage VAs (5)
          </div>
        </div>
      ) : (
        <Skeleton className={styles.skeleton} />
      )}

      <PortfolioList title="Portfolio" type="bar" />

      <motion.div
        className={styles.manage}
        initial={{ transform: "translateY(100%)", top: 0 }}
        animate={{
          transform: product ? "translateY(0)" : "translateY(100%)",
          top: product ? 0 : "100%",
        }}
        transition={{ duration: 0.2 }}
        onClick={() => setManage(false)}
      >
        {product && (
          <Products
            close={() => {
              setProduct(false);
              setPage("");
            }}
          />
        )}
      </motion.div>

      <motion.div
        className={styles.manage}
        initial={{ transform: "translateY(100%)", top: 0 }}
        animate={{
          transform: manage ? "translateY(0)" : "translateY(100%)",
          top: manage ? 0 : "100%",
        }}
        transition={{ duration: 0.2 }}
        onClick={() => setManage(false)}
      >
        account
      </motion.div>
    </div>
  );
};

export default Home;
