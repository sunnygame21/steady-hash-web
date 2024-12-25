"use client";
import React, { useEffect } from "react";
import { Collapse, CollapseProps } from "antd";
import { ArrowIcon, ProfitIcon } from "@/components/Icons";
import icon from "@/images/home/item1.png";

import styles from "./index.module.css";


const Holdings = () => {
  useEffect(() => {}, []);
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className={styles.label}>
          VA Holdings <ArrowIcon className={styles.colIcon} />
        </div>
      ),
      children: (
        <div className={styles.orderList}>
          <div className={styles.orderItem}>
            <img src={icon.src} className={styles.itemImage}></img>
            <div className={styles.itemRight}>
              <div className={styles.itemDetail}>
                <p className={styles.name}>
                  Steady <span> (#STEADY_4)</span>
                </p>
                <p className={styles.desc}>Earning starts soon, 12-04</p>
              </div>
              <div className={styles.status}>
                <p className={styles.money}>$5,000.00</p>
                <p className={styles.type}><ProfitIcon />$88</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div className={styles.holdingWrap}>
      <Collapse
        key={"holding"}
        defaultActiveKey={["1"]}
        onChange={onChange}
        items={items}
        bordered={false}
        className={styles.quesItem}
        expandIcon={() => null}
      />
    </div>
  );
};

export default Holdings;
