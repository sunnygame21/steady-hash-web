"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/app/state/global";
import { CartIcon } from "../Icons";
import PortfolioList from "./portfolio";
import Orders from "./order";
import BarCalendarChart from "../multi-chart";

import styles from "./index.module.css";



const Home = () => {
  const router = useRouter();
  const {user} = useContext(GlobalContext)
  return ( 
    <div className={styles.wrap}>
      <div className={styles.info}>
        <p className={styles.name}>Hi, {user?.showName} 👋</p>
        <p className={styles.welcome}>Welcome back to SteadyHash!</p>
      </div>
      <BarCalendarChart defaultType='bar' />
      <div
        className={styles.exploreBtn}
        onClick={() => router.push("/product")}
      >
        <CartIcon />
        Explore
      </div>
      <PortfolioList title={"Portfolio"} />
      <Orders />
    </div>
  );
};

export default Home;
