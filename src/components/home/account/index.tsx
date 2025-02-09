import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { floor } from "lodash";
import { motion } from "framer-motion";
import { GlobalContext } from "@/app/state/global";
import { getYesterdayProfit, transBarProfit } from "@/utils/profit";
import { addCommas, classNames } from "@/utils/helper";

import styles from "./index.module.css";
import {
  AccountCalenderIcon,
  AccountHeadIcon,
  BackBlackIcon,
  ExchangeIcon,
} from "@/components/Icons";

const Account = ({ onClose }: any) => {
  const { user, productsList, sevenDaysSumData, setPage } =
    useContext(GlobalContext);

  if (!user?.id) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <BackBlackIcon className={styles.close} onClick={onClose} />
        <h3 className={styles.head}>Asset Detail </h3>
      </div>
      <div className={styles.accountList}>
        <div className={styles.accountItem}>
          <div className={styles.top}>
            <div className={styles.icon}>
              <AccountHeadIcon />
            </div>
            <div className={styles.mid}>
              <p className={styles.name}>name</p>
              <p className={styles.desc}>Client since 2024</p>
            </div>
            <div className={classNames(styles.right, styles.active)}>active</div>
          </div>
          <div className={styles.bottom}>
            <AccountCalenderIcon />
            <p className={styles.num}>
              <ExchangeIcon />
              $11,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
