"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Collapse, CollapseProps } from "antd";
import { multiply } from "lodash";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { GlobalContext } from "@/app/state/global";
import { Product } from "@/types/info";
import { classNames } from "@/utils/helper";
import { AlertIcon, ArrowIcon, CloseIcon } from "../Icons";
import Detail from "./detail";

import styles from "./index.module.css";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Products = () => {
  const params = useSearchParams();
  const page = params.get("page");
  const { productsList, setPage } = useContext(GlobalContext);
  const [productModal, setProductModal] = useState(false);
  const close = () => {
    setPage("");
  };

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

  useEffect(() => {
    setProductModal(page === "product");
  }, [page]);

  return (
    <motion.div
      initial={{ transform: "translateY(100%)", top: 0 }}
      animate={{
        transform: productModal ? "translateY(0)" : "translateY(100%)",
        top: productModal ? 0 : "100%",
      }}
      transition={{ duration: 0.3 }}
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
          {productsList.length > 0 ? (
            productsList.map((item, i) => {
              return (
                <div
                  className={styles.productItem}
                  key={`product-item-${i}`}
                  onClick={() => {
                    setPage(`page=product&productId=${item.id}`);
                  }}
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
            })
          ) : (
            <Skeleton className={styles.itemSkeleton}></Skeleton>
          )}
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
        {/* 
        <motion.div
          className={styles.detailWrap}
          initial={{ left: "100%" }}
          animate={{
            left: !!selectProduct ? 0 : "100%",
          }}
          transition={{ duration: 0.2 }}
        >
          <Detail
            detailData={selectProduct}
            onClose={() => setSelectProduct(null)}
          />
        </motion.div> */}
        <Detail />
      </div>
    </motion.div>
  );
};

export default Products;
