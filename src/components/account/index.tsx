import React, { useContext, useState } from "react";
import { find, floor } from "lodash";
import { GlobalContext } from "@/app/state/global";
import { addCommas } from "@/utils/helper";
import { Role } from "@/constant";
import VADropDown from "@/components/va-dropdown";
import { LogoutIcon } from "@/components/Icons";
import deposit from "@/images/account/deposit.png";
import exchange from "@/images/account/exchange.png";
import withdraw from "@/images/account/withdraw.png";

import styles from "./index.module.css";


const users = ["Jillian", "Jasmin", "Beatty"];

const Account = () => {
  const { user, userShares, productsList, logout } = useContext(GlobalContext);
  const [curUser, seCurUser] = useState(users[0]);
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <p className={styles.name}>Hi, {user?.showName} 👋</p>
        <p className={styles.desc}>Account Value</p>
        <p className={styles.allMoney}>${addCommas(user?.allMoney)}</p>

        {user?.role > Role.HOLDER && (
          <VADropDown
            className={styles.dropdown}
            overlayClassName={styles.overlay}
            curUser={curUser}
            seCurUser={seCurUser}
            text={"Manage VA"}
          />
        )}
        {user?.role === Role.HOLDER && (
          <div className={styles.backBtn}>
            Back
            <LogoutIcon />
          </div>
        )}
      </div>

      <div className={styles.action}>
        <div className={styles.actionItem} aria-disabled>
          <img src={deposit.src} alt="" />
          <p>Deposit</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.actionItem}>
          <img src={withdraw.src} alt="" />
          <p>Withdraw</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.actionItem}>
          <img src={exchange.src} alt="" />
          <p>Exchange</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.mainTitle}>Your Assets</div>
        {userShares.map((item, i) => {
          const curProduct = find(
            productsList,
            (product) => product?.id === item?.productId
          );
          return (
            <div className={styles.investItem} key={`account-share-item-${i}`}>
              <div className={styles.topInfo}>
                <img
                  src={curProduct?.icon}
                  alt=""
                  className={styles.itemImage}
                />
                <div className={styles.itemRight}>
                  <div className={styles.itemDetail}>
                    <p className={styles.itemName}>{curProduct?.name}</p>
                    <p className={styles.desc}>Earning starts soon</p>
                  </div>
                  <div className={styles.status}>
                    <p className={styles.money}>
                      {floor((item.profit / item.shareAmount) * 100, 2)}%
                    </p>
                    <p className={styles.type}>Pnl</p>
                  </div>
                </div>
              </div>
              <div className={styles.Hline}></div>
              <div className={styles.investInfo}>
                <div className={styles.infoTitle}>
                  <p>Investment</p>
                  <p>Profits</p>
                </div>
                <div className={styles.infoNum}>
                  <p>${addCommas(item.shareAmount)}</p>
                  <p>${addCommas(item.profit)}</p>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div className={styles.balance}>
          <div className={styles.infoTitle}>
            <p>Balance</p>
            <p>Available</p>
          </div>
          <div className={styles.infoNum}>
            <p>$20,000.00</p>
            <p>$3,450.00</p>
          </div>
        </div> */}
      </div>
      {user?.role === Role.HOLDER ? (
        <div className={styles.logout} onClick={logout}>
          Return to Main Account
        </div>
      ) : (
        <div className={styles.logout} onClick={logout}>
          Logout
        </div>
      )}
    </div>
  );
};

export default Account;
