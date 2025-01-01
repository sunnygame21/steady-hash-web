import React from "react";
import { classNames } from "@/utils/helper";

import styles from "./index.module.css";

interface NoDataProps {
  desc?: string;
  className?: string;
}

const NoData = ({ desc, className }: NoDataProps) => {
  return (
    <div className={classNames(styles.wrap, className)}>
      {/* <img className={styles.noData} src={emptyImg.src}></img> */}
      <div className={styles.desc}>{desc || 'NoData'}</div>
    </div>
  );
};

export default NoData;
