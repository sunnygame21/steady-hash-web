"use client";
import React, { useContext, useState } from "react";
import { classNames } from "@/utils/helper";
import { GlobalContext } from "@/app/state/global";
import { CAlENDAR_TYPE, CHART_TYPE } from "@/constant";
import { BarIcon, CalendarIcon } from "@/components/Icons";
import EchartsBar from "./bar";
import Calendar from "./calendar";

import styles from "./index.module.css";

const ChartType: any = {
  [CHART_TYPE.calendar]: {
    key: "calendar",
    style: styles.calendarWrap,
    icon: <BarIcon />,
    iconStyle: "",
  },
  [CHART_TYPE.bar]: {
    key: "bar",
    style: styles.barWrap,
    icon: <CalendarIcon />,
    iconStyle: styles.barIcon,
  },
};

const BarCalendarChart = ({ defaultType }: { defaultType?: string }) => {
  const [type, setType] = useState(
    ChartType[defaultType || ""] || ChartType.calendar
  );
  const [calendarType, calendarTypeChange] = useState("");
  const { userShares } = useContext(GlobalContext);

  const chartTypeChange = () => {
    if (type.key === CHART_TYPE.bar) {
      setType(ChartType.calendar);
    } else {
      setType(ChartType.bar);
    }
  };

  return userShares.length ? (
    <div
      className={classNames(
        styles.chartContainer,
        type.style,
        calendarType === CAlENDAR_TYPE.year ? styles.yearWarp : ""
      )}
    >
      <div
        className={classNames(styles.icon, type.iconStyle)}
        onClick={chartTypeChange}
      >
        {type.icon}
      </div>

      {type.key === CHART_TYPE.bar ? (
        <EchartsBar />
      ) : (
        <Calendar calendarTypeChange={calendarTypeChange} />
      )}
    </div>
  ) : (
    <div className={classNames(styles.chartContainer, styles.noData)}>
      🤔 You haven’t invest any profit.
    </div>
  );
};

export default BarCalendarChart;
