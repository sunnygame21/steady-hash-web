import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { floor } from "lodash";
import { GlobalContext } from "@/app/state/global";
import { getYesterdayProfit, transBarProfit } from "@/utils/profit";
import { addCommas } from "@/utils/helper";
import { CartIcon } from "../Icons";
import BarCalendarChart from "../multi-chart";
import Products from "../product";
import PortfolioList from "./portfolio";

import styles from "./index.module.css";

const Home = () => {
  const { user, productsList, sevenDaysSumData, setPage } =
    useContext(GlobalContext);

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
        <div
          className={styles.exploreBtn}
          onClick={() => setPage("page=product")}
        >
          <CartIcon />
          Explore
        </div>
      ) : (
        <Skeleton className={styles.skeleton} />
      )}

      <PortfolioList title="Portfolio" type="bar" />

      <Products />
    </div>
  );
};

export default Home;
