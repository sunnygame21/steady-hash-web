import React, { useContext, useEffect, useState } from "react";
import * as echarts from "echarts";
import { get, maxBy, round, sumBy } from "lodash";
import Skeleton from "react-loading-skeleton";
import { GlobalContext } from "@/app/state/global";
import { addCommas, nextEvenNumber } from "@/utils/helper";

import styles from "./index.module.css";

const EchartsBar = () => {
  const { chartLoading, sevenDaysSumData, userShares } = useContext(GlobalContext);
  const sumProfit = addCommas(sumBy(userShares,'profit'))

  useEffect(() => {
    if (sevenDaysSumData.length) {
      const max = get(maxBy(sevenDaysSumData, "profit"), "profit", 0);
      console.log('nextEvenNumber(max)' , nextEvenNumber(max) , nextEvenNumber(max) / 2)
      const option = {
        tooltip: {},
        grid: {
          top: "5%", // 调整顶部的间距
          left: "13%",
          right: "5%",
          bottom: "20%",
        },
        xAxis: {
          type: "category",
          data: sevenDaysSumData.map((item) => item.date.substring(8)),
          axisLine: {
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
          max: nextEvenNumber(max),
          min: 0,
  
          splitNumber: 2, // max / splitNumber是间隔,
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
            data: sevenDaysSumData.map((item) => item.profit),
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
    <div className={styles.barWrap}>
      <div className={styles.detailInfo}>
        <p className={styles.title}>Total Profit</p>
        <p className={styles.num}>
          ${sumProfit}
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
