import React, { useContext, useEffect, useState } from "react";
import { find } from "lodash";
import { GlobalContext } from "@/app/state/global";
import { addCommas } from "@/utils/helper";
import {ProfitIcon } from "@/components/Icons";
import VADropDown from "@/components/va-dropdown";
import styles from "./index.module.css";

const users = ["Jillian", "Jasmin", "Beatty"];

const Holdings = () => {
  const { userShares, productsList, user } = useContext(GlobalContext);
  const [curUser, seCurUser] = useState(users[0]);

  return (
    <div className={styles.holdingWrap}>
      <div className={styles.top}>
        <VADropDown
          curUser={curUser}
          seCurUser={seCurUser}
          className={styles.dropdown}
        />
        <p className={styles.curName}>{user?.showName}</p>
      </div>
      <div className={styles.holdList}>
        {userShares.map((share, i) => {
          const curProduct: any = find(
            productsList,
            (product) => product?.id === share?.productId
          );
          return (
            <div className={styles.holdItem} key={`holding-item-${i}`}>
              <img src={curProduct?.icon} className={styles.itemImage}></img>
              <div className={styles.itemRight}>
                <div className={styles.itemDetail}>
                  <p className={styles.name}>{curProduct?.name}</p>
                  <p className={styles.desc}>Earning starts soon</p>
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
