"use client";
import React, { useContext, useEffect, useState } from "react";
import { find } from "lodash";
import { Dropdown } from "antd";
import { GlobalContext } from "@/app/state/global";
import { addCommas } from "@/utils/helper";
import { ArrowIcon, ProfitIcon } from "@/components/Icons";
import icon from "@/images/home/item1.png";

import styles from "./index.module.css";

const users = ["Jillian", "Jasmin", "Beatty"];

const Holdings = () => {
  const { userShares, productsList } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [curUser, seCurUser] = useState(users[0]);
  
  const changeUser = (name: string) => {
    setOpen(false);
    seCurUser(name);
  };

  return (
    <div className={styles.holdingWrap}>
      <div className={styles.top}>
        <Dropdown
          key={"holding"}
          trigger={["click"]}
          className={styles.quesItem}
          placement="bottomRight"
          open={open}
          dropdownRender={() => {
            return (
              <div className={styles.userList}>
                {users.map((item) => {
                  return (
                    <div
                      className={styles.userItem}
                      onClick={() => changeUser(item)}
                      key={item}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            );
          }}
        >
          <div className={styles.label} onClick={() => setOpen(!open)}>
            VA Holdings <ArrowIcon className={styles.colIcon} />
          </div>
        </Dropdown>
        <p className={styles.curName}>{curUser}</p>
      </div>
      <div className={styles.orderList}>
        {userShares.map((share, i) => {
          const curProduct: any = find(
            productsList,
            (product) => product?.id === share?.productId
          )
          return (
            <div className={styles.orderItem} key={`holding-item-${i}`}>
              <img src={icon.src} className={styles.itemImage}></img>
              <div className={styles.itemRight}>
                <div className={styles.itemDetail}>
                  <p className={styles.name}>{curProduct?.name}</p>
                  <p className={styles.desc}>Earning starts soon, 12-04</p>
                </div>
                <div className={styles.status}>
                  <p className={styles.money}>
                    ${addCommas(share.shareAmount)}
                  </p>
                  <p className={styles.type}>
                    <ProfitIcon />${addCommas(share.profit)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holdings;
