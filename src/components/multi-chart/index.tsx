"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { classNames } from "@/utils/helper";
import { GlobalContext } from "@/app/state/global";
import { CHART_TYPE } from "@/constant";
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
interface Props {
  chartData?: any;
  defaultType?: string;
}

const BarCalendarChart = (props: Props) => {
  const { defaultType, chartData = {} } = props;
  const { detailStyle = {} } = chartData;
  const [type, setType] = useState(
    ChartType[defaultType || ""] || ChartType.calendar
  );
  const { userShares } = useContext(GlobalContext);

  const divRef = useRef<any>(null); // 创建一个 ref 来引用 div 元素
  const [divHeight, setDivHeight] = useState(0); // 存储 div 高度

  const chartTypeChange = () => {
    if (type.key === CHART_TYPE.bar) {
      setType(ChartType.calendar);
    } else {
      setType(ChartType.bar);
    }
  };

  useEffect(() => {
    const divElement = divRef.current;
    // 创建 ResizeObserver 实例
    const resizeObserver = new ResizeObserver(() => {
      if (divElement) {
        setDivHeight(divElement.offsetHeight);
        // divElement.style.height = divElement.offsetHeight;
      }
    });

    if (divElement) {
      resizeObserver.observe(divElement); // 监听 div 高度变化
    }

    // 清除观察器
    return () => {
      if (divElement) {
        resizeObserver.unobserve(divElement);
      }
    };
  }, [userShares.length]); // 只在组件初次渲染时设置 ResizeObserver

  return userShares.length ? (
    <div
      style={{ height: divHeight, background: detailStyle.background }}
      className={classNames(
        styles.chartContainer,
        type.style,
        chartData?.className
      )}
    >
      <div
        className={classNames(styles.icon, type.iconStyle)}
        style={{ background: detailStyle.icon }}
        onClick={chartTypeChange}
      >
        {type.icon}
      </div>
      <div ref={divRef}>
        {type.key === CHART_TYPE.bar ? (
          <EchartsBar chartData={chartData} />
        ) : (
          <Calendar chartData={chartData} />
        )}
      </div>
    </div>
  ) : (
    <div className={classNames(styles.chartContainer, styles.noData)}>
      🤔 You haven’t invest any profit.
    </div>
  );
};

export default BarCalendarChart;
