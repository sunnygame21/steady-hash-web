"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertIcon, CloseIcon } from "../Icons";
import icon from "/public/home/item1.png";

import styles from "./index.module.css";
import Detail from "./detail";

const Product = () => {
  const router = useRouter();
  const [selectProduct, setSelectProduct] = useState(0);
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
      {!!selectProduct && <Detail onClose={() => setSelectProduct(0)} />}
    </div>
  );
};

export default Product;
