"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertIcon, ArrowIcon, CloseIcon, ProfileIcon } from "../Icons";
import icon from "@/images/home/item1.png";

import styles from "./index.module.css";
import Detail from "./detail";
import { Collapse, CollapseProps } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type ExpandIconPosition = "start" | "end";
const Product = () => {
  const router = useRouter();
  const [selectProduct, setSelectProduct] = useState(0);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <div className={styles.colItem}>{text}</div>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <div className={styles.colItem}>{text}</div>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <div className={styles.colItem}>{text}</div>,
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };


  return (
    <div className={styles.wrap}>
      <CloseIcon className={styles.close} onClick={() => router.back()} />
      <div className={styles.logo}>
        Steady
        <span>Hash</span>
      </div>
      <div className={styles.title}>Product Gallery</div>
      <div className={styles.subTitle}>
        Quant Trading Products powered by AI
      </div>
      <div className={styles.productList}>
        {[1, 2, 3, 4].map((item, i) => {
          return (
            <div
              className={styles.productItem}
              key={`product-item-${i}`}
              onClick={() => setSelectProduct(item)}
            >
              <div className={styles.top}>
                <img src={icon.src} alt="" />
                <p>10%</p>
              </div>
              <div className={styles.bottom}>
                <p>Steady</p>
                <p>by SteadyHash</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.warn}>
        <AlertIcon />
        APR based on last 6-month performance
      </div>
      <div className={styles.questionWrap}>
        <p className={styles.quesTitle}>Popular Questions</p>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          items={items}
          bordered={false}
          className={styles.quesItem}
          expandIcon={() => <ArrowIcon className={styles.colIcon} />}
          expandIconPosition="end"
          key={'product'}
        />
      </div>

      {!!selectProduct && <Detail onClose={() => setSelectProduct(0)} />}
    </div>
  );
};

export default Product;
