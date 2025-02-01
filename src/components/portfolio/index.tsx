"use client";
import React, { useContext } from "react";
import { floor } from "lodash";
import { GlobalContext } from "@/app/state/global";
import { transBarProfit } from "@/utils/profit";
import { addCommas } from "@/utils/helper";
import BarCalendarChart from "@/components/multi-chart";
import Summary from "./summary";
import Holdings from "./holding";

import styles from "./index.module.css";

const Portfolio = () => {
  const { user, sevenDaysSumData } = useContext(GlobalContext);
  console.log('user', user)
  return (
    user?.allInvest && (
      <div className={styles.wrap}>
        <div className={styles.pageTitle}>Portfolio</div>
        <BarCalendarChart
          defaultType="calender"
          chartData={{
            dataList: transBarProfit(sevenDaysSumData, user.allInvest, 7),
            percent: floor(((user.allProfit || 0) / user.allInvest) * 100, 2),
            total: addCommas(user.allMoney),
          }}
        />
        <Summary />
        <Holdings />
      </div>
    )
  );
};

export default Portfolio;
