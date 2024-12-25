"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";

import styles from "./index.module.css";

const Line = ({ title }: any) => {
  const option = {
    grid: {
      top: "5%", // 调整顶部的间距
      left: "0%",
      right: "0%",
      bottom: "10%",
    },
    xAxis: {
      type: "category",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 自定义月份

      axisTick: {
        show: false,
      },
      axisLine: {
        show: true, // 显示 x 轴轴线
        lineStyle: {
          type: "dashed", // 虚线
          color: "rgba(209, 213, 219, 1)",
        },
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      max: 1,
      min: -1,
      splitNumber: 5, //max / splitNumber是间隔,
      inverse: false, // 确保坐标轴方向正常
      axisLine: {
        show: false, // 隐藏y轴线
      },
      axisTick: {
        show: false, // 隐藏刻度
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    visualMap: {
      show: false,
      pieces: [
        {
          gt: -1,
          lte: 0,
          color: "rgba(239, 71, 112, 1)",
        },
        {
          gt: 0,
          lte: 1,
          color: "rgba(69, 179, 105, 1)",
        },
      ],
    },
    series: [
      {
        color: null,
        type: "line",
        showSymbol: false, // 显示拐点
        lineStyle: {
          width: 1.2,

          itemStyle: {
            color: function (params: any) {
              // 根据 Y 值动态设置颜色
              return params.value >= 0 ? "#5470c6" : "black"; // 蓝色/黑色
            },
          },
        },

        data: [
          0.2,
          0.3,
          -0.52,
          0.3,
          0.25,
          0.4,
          0.4,
          0.2,
          -0.6,
          0.4,
          0.6,
          -0.2,
          0.25,
          0.4,
          0.5,
          0.2,
          0.15,
          -0.4,
        ], // 数据
      },
    ],
  };
  useEffect(() => {
    const chartDom = document.getElementById("portfolioChart-chart2");
    const myChart = echarts.init(chartDom);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  }, []);

  return <div id="portfolioChart-chart2" className={styles.bar}></div>;
};

export default Line;
