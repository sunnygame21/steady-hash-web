import React, { useContext, useEffect, useState } from "react";
import * as echarts from "echarts";
import moment from "moment";
import { get, maxBy, sumBy } from "lodash";
import Skeleton from "react-loading-skeleton";
import { GlobalContext } from "@/app/state/global";
import { formatAmount, sumProfit } from "@/utils/helper";

import styles from "./index.module.css";

const EchartsBar = () => {
  const { userShares, chartLoading, sevenDaysSumData } =
    useContext(GlobalContext);
  useEffect(() => {
    if (sevenDaysSumData.length) {
      const max = get(maxBy(sevenDaysSumData, "dailyprofit"), "dailyprofit", 0);
      const option = {
        tooltip: {},
        grid: {
          top: "5%", // 调整顶部的间距
          left: "13%",
          right: "5%",
          bottom: "30%",
        },
        xAxis: {
          type: "category",
          data: sevenDaysSumData.map((item) => item.date.substring(8)),

          axisLine: {
            // show: true, // 显示 x 轴轴线
            lineStyle: {
              type: "dashed", // 将轴线设置为虚线
              color: "rgba(55, 65, 81, 1)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            color: "rgba(162, 182, 185, 1)",
            fontWeight: "bold",
          },
        },
        yAxis: {
          type: "value",
          scale: true,
          max: (max + 10).toFixed(0),
          min: 0,
          splitNumber: 1, //max / splitNumber是间隔,
          inverse: false, // 确保坐标轴方向正常
          boundaryGap: 0, // 控制类目轴的起始位置，true 表示柱状图从第一个类别开始显示
          splitLine: {
            show: true, // 显示分隔线
            lineStyle: {
              type: "dashed", // 设置线条类型为虚线
              color: "rgba(55, 65, 81, 1)",
            },
          },
          axisLabel: {
            show: true,
            formatter: "{value}", // 添加百分号
            color: "rgba(115, 146, 151, 1)",
            fontSize: 12,
            fontFamily: "Roboto",
          },
        },
        series: [
          {
            type: "bar",
            data: sevenDaysSumData.map((item) => item.dailyprofit),
            barWidth: 10,
            itemStyle: {
              color: "rgba(255, 216, 74, 1)",
              borderRadius: [2, 2, 0, 0],
            },
          },
        ],
      };
      const chartDom = document.getElementById("bar-chart");
      const chart = echarts.getInstanceByDom(chartDom as any);
      if (chart) {
        chart.dispose();
      }
      const myChart = echarts.init(chartDom);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      option && myChart.setOption(option);
    }
  }, [sevenDaysSumData.length]);

  useEffect(() => {}, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.detailInfo}>
        <p className={styles.title}>Total Profit</p>
        <p className={styles.num}>
          ${formatAmount(sumBy(sevenDaysSumData, "dailyprofit")).substring(1)}
        </p>
        <p className={styles.desc}>
          {/* <ProfitIcon /> */}
          <span></span> Total earnings for the past seven days
        </p>
      </div>
      <div id="bar-chart" className={styles.bar}></div>

      {chartLoading && (
        <div className={styles.skeletonWrap}>
          <Skeleton count={1} className={styles.skeleton} />
        </div>
      )}
    </div>
  );
};

export default EchartsBar;
