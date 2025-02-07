import React, { useContext, useEffect, useState } from "react";
import * as echarts from "echarts";
import { floor, maxBy, round, sumBy } from "lodash";
import Skeleton from "react-loading-skeleton";
import { GlobalContext } from "@/app/state/global";
import {
  calculateMaxNum,
  getYesterdayProfit,
  transBarProfit,
} from "@/utils/profit";
import { addCommas } from "@/utils/helper";
import { UNIT_NUMBER, UNIT_PERCENT } from "@/constant";
import { ProfitIcon } from "@/components/Icons";

import styles from "./index.module.css";

interface Props {
  chartData: any;
}

const EchartsBar = (props: Props) => {
  const { chartData } = props;
  const {
    dataList,
    total,
    percent,
    yesterPercent,
    productId,
    detailStyle = {},
  } = chartData || {};
  const { chartLoading, user } = useContext(GlobalContext);
  console.log("dataList", dataList);

  const maxProfit: any = maxBy(dataList, "profit");
  const maxNum = calculateMaxNum(maxProfit?.profit || 0, UNIT_NUMBER, 1.5);
  const maxPercent = floor(
    calculateMaxNum(maxProfit?.percent || 0, UNIT_PERCENT, 1.5),
    1
  );

  useEffect(() => {
    if (dataList.length) {
      const option = {
        tooltip: {
          show: false, // 禁用 tooltip 提示框
        },
        grid: {
          top: "5%", // 调整顶部的间距
          left: "0%",
          right: "0%",
          bottom: "20%",
        },
        xAxis: {
          type: "category",
          data: dataList.map((item: any) => item.weekend),
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
            color: detailStyle.chartText || "rgba(162, 182, 185, 1)",
            fontWeight: "bold",
            margin: 12,
          },
        },
        yAxis: [
          {
            type: "value",
            max: maxNum,
            min: 0,
            // splitNumber: 1,
            inverse: false, // 确保坐标轴方向正常
            boundaryGap: 0, // 控制类目轴的起始位置，true 表示柱状图从第一个类别开始显示
            axisLine: {
              show: false, // 隐藏y轴线
            },
            interval: maxNum / 2,
            showMaxLine: {
              show: false,
            },
            showMinLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: true, // 显示分隔线
              lineStyle: {
                type: "dashed", // 设置线条类型为虚线
                color: "rgba(55, 65, 81, 1)",
              },
            },
          },
          {
            type: "value",
            max: maxPercent,
            min: 0,
            boundaryGap: 0,
            axisLine: {
              show: false, // 隐藏y轴线
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false, // 显示分隔线
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: dataList.map((item: any) => item.profit),
            barWidth: 10,
            itemStyle: {
              color: "rgba(255, 216, 74, 1)",
              borderRadius: [2, 2, 0, 0],
            },
            // 使用主 Y 轴
            yAxisIndex: 0,
          },
          {
            type: "bar",
            data: dataList.map((item: any) => item.percent),
            barWidth: 10,
            itemStyle: {
              color: "rgba(55, 65, 81, 1)",
              borderRadius: [2, 2, 0, 0],
            },
            // 使用副 Y 轴
            yAxisIndex: 1,
          },
        ],
      };
      const chartDom = document.getElementById(`bar-chart-${productId}`);
      const chart = echarts.getInstanceByDom(chartDom as any);
      if (chart) {
        chart.dispose();
      }
      const myChart = echarts.init(chartDom);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      option && myChart.setOption(option);
    }
  }, [JSON.stringify(chartData)]);

  return (
    <div className={styles.barWrap}>
      <div className={styles.detailInfo}>
        <p className={styles.title} style={{ color: detailStyle.title }}>
          Total Value
        </p>
        <p className={styles.num} style={{ color: detailStyle.num }}>
          ${total}
        </p>
        <p className={styles.desc}>
          <ProfitIcon />
          <span>
            {percent}% {yesterPercent}%&ensp;
          </span>
          vs Last week
        </p>
      </div>
      <div id={`bar-chart-${productId}`} className={styles.bar}></div>

      {chartLoading && <Skeleton className={styles.skeleton} />}
    </div>
  );
};

export default EchartsBar;
