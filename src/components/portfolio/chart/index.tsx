"use client";
import React, { useState } from "react";
import { classNames } from "@/utils/helper";
import { BarIcon, CalendarIcon } from "@/components/Icons";
import EchartsBar from "./bar";
import PortfolioList from "../../home/portfolio";
import Calendar from "./calendar";

import styles from "./index.module.css";

const ChartType = {
  calendar: {
    key: "calendar",
    style: "",
    icon: <BarIcon />,
    chart: <Calendar />,
    iconStyle: "",
  },
  bar: {
    key: "bar",
    style: styles.barWrap,
    icon: <CalendarIcon />,
    chart: <EchartsBar />,
    iconStyle: styles.barIcon,
  },
};

const BarCalendarChart = () => {
  const [type, setType] = useState(ChartType.calendar);

  const typeChange = () => {
    if (type.key === ChartType.bar.key) {
      setType(ChartType.calendar);
    } else {
      setType(ChartType.bar);
    }
  };

  return (
    <div className={classNames(styles.chartContainer, type.style)}>
      <div
        className={classNames(styles.icon, type.iconStyle)}
        onClick={typeChange}
      >
        {type.icon}
      </div>
      {type.chart}
    </div>
  );
};

export default BarCalendarChart;
