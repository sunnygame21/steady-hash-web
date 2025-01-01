"use client";
import React, { useContext, useEffect, useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { bignumber, format } from "mathjs";
import { motion } from "framer-motion";
import { GlobalContext } from "@/app/state/global";
import { Product } from "@/types/info";
import { addCommas, classNames } from "@/utils/helper";
import { AlertIcon, ArrowIcon, CloseIcon, ProfileIcon } from "../Icons";
import Detail from "./detail";

import styles from "./index.module.css";
import { multiply } from "lodash";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Products = ({ close, show }: any) => {
  const { productsList } = useContext(GlobalContext);
  const [selectProduct, setSelectProduct] = useState<Product | null>(null);

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
    <motion.div
      initial={{ transform: "translateY(100%)" }}
      animate={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
      transition={{ duration: 0.2 }}
      className={classNames(styles.wrap)}
    >
      <div>
        <CloseIcon className={styles.close} onClick={close} />
        <div className={styles.logo}>
          Steady
          <span>Hash</span>
        </div>
        <div className={styles.title}>Product Gallery</div>
        <div className={styles.subTitle}>
          Quant Trading Products powered by AI
        </div>

        <div className={styles.productList}>
          {productsList.map((item, i) => {
            return (
              <div
                className={styles.productItem}
                key={`product-item-${i}`}
                onClick={() => setSelectProduct(item)}
              >
                <div className={styles.top}>
                  <img src={item?.icon} alt="" />
                  <p>{multiply(item.apr_7day, 100).toFixed(2)}%</p>
                </div>
                <div className={styles.bottom}>
                  <p>{item?.name}</p>
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
            key={"product"}
          />
        </div>

        <motion.div
          className={styles.detailWrap}
          initial={{ transform: "translateX(100%)" }}
          animate={{
            transform: !!selectProduct ? "translateX(0)" : "translateX(100%)",
          }}
          transition={{ duration: 0.2 }}
        >
          {!!selectProduct ? (
            <Detail
              detailData={selectProduct}
              onClose={() => setSelectProduct(null)}
            />
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Products;
