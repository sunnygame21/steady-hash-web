"use client";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { GlobalContext } from "@/app/state/global";
import { CartIcon } from "../Icons";
import BarCalendarChart from "../multi-chart";
import Products from "../product";
import PortfolioList from "./portfolio";
import Orders from "./order";

import styles from "./index.module.css";

const Home = () => {
  const { user, productsList, logout } = useContext(GlobalContext);
  const [productModal, setProductModal] = useState(false);

  return user?.id ? (
    <div className={styles.wrap}>
      <div className={styles.info} onClick={logout}>
        <p className={styles.name}>Hi, {user?.showName} 👋</p>
        <p className={styles.welcome}>Welcome back to SteadyHash!</p>
      </div>
      <BarCalendarChart defaultType="bar" />
      {productsList.length > 0 ? (
        <div
          className={styles.exploreBtn}
          onClick={() => setProductModal(true)}
        >
          <CartIcon />
          Explore
        </div>
      ) : (
        <Skeleton className={styles.skeleton}></Skeleton>
      )}

      <PortfolioList title={"Portfolio"} type="bar" />
      <Products show={productModal} close={() => setProductModal(false)} />

      {/* <Orders /> */}
    </div>
  ) : null;
};

export default Home;
