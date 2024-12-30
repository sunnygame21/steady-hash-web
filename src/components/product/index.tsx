"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Collapse, CollapseProps } from "antd";
import { GlobalContext } from "@/app/state/global";
import { Product } from "@/types/info";
import { AlertIcon, ArrowIcon, CloseIcon, ProfileIcon } from "../Icons";
import icon from "@/images/home/item1.png";
import Detail from "./detail";

import styles from "./index.module.css";


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Products = () => {
  const router = useRouter();
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
        {productsList.map((item, i) => {
          return (
            <div
              className={styles.productItem}
              key={`product-item-${i}`}
              onClick={() => setSelectProduct(item)}
            >
              <div className={styles.top}>
                <img src={item?.icon} alt="" />
                <p>10%</p>
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

      {!!selectProduct && <Detail  detailData={selectProduct} onClose={() => setSelectProduct(null)} />}
    </div>
  );
};

export default Products;
