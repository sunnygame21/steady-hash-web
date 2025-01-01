import React, { useEffect } from "react";
import * as echarts from "echarts";

import styles from "./index.module.css";
import { findIndex, get, maxBy, minBy, parseInt, round } from "lodash";
import { nextEvenNumber } from "@/utils/helper";

const EchartLine = ({ data = [] }: any) => {
  const maxProfit: any = maxBy(data, "profit") || {};
  const min = get(minBy(data, "profit"), "profit", 0);
  const index = findIndex(
    data,
    (item: any) => maxProfit?.profit === item.profit
  );
  const option = {
    tooltip: {
      trigger: "axis",
      triggerOn: "none",
      backgroundColor: "rgba(45, 91, 98, 1);", // 自定义tooltip背景
      borderColor: "rgba(115, 146, 151, 1)",
      borderRadius: 8,
      padding: [8, 12],
      textStyle: {
        color: "#FFFFFF", // 文本颜色
        fontSize: 12,
        fontFamily: "Roboto",
      },
      formatter: function (params: any) {
        // 自定义内容
        const value = params[0].value;
        const month = params[0].name;
        return `<div style="text-align: center; font-size: 12px;  ">
                  <span style="font-weight: bold;">+${value}</span><br/>
                  <span style="color: rgba(162, 182, 185, 1);font-size: 12px; ">${month.toUpperCase()}</span>
                </div>`;
      },
      position: ["30%", "50%"],
    },
    grid: {
      top: "5%", // 调整顶部的间距
      left: "16%",
      right: "5%",
      bottom: "10%",
    },
    xAxis: {
      type: "category",
      data: data.map((item: any) => item.date.substring(5)), // 自定义月份
      axisLabel: {
        show: true, // 显示下方的标签
        interval: parseInt(`${round(data?.length / 3)}`), // 每隔10个标签显示一次

        position: "bottom", // 坐标轴标签位置在底部
        color: "rgba(115, 146, 151, 1)",
        fontSize: 12,
        fontFamily: "Roboto",
        fontWeight: "bold",
        customValues: [1, round(data.length / 2), data.length - 1],
      },

      axisTick: {
        show: false,
      },
      axisLine: {
        show: false, // 显示 x 轴轴线
      },
      splitLine: {
        show: false,
        // width: function (index: number) {
        //   return index % 2 === 0 ? 1 : 2;
        // },
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      max: nextEvenNumber(maxProfit.profit || 0),
      min: min,
      splitNumber: 2, //max / splitNumber是间隔,
      splitList: [
        min, maxProfit?.profit
      ],

      inverse: false, // 确保坐标轴方向正常
      axisLine: {
        show: false, // 隐藏y轴线
      },
      axisTick: {
        show: false, // 隐藏刻度
      },
      splitLine: {
        lineStyle: {
          type: "dashed", // 虚线
          color: "#676C85",
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
      // {
      //   data: [0.2, 0.3, 0.42, 0.1, 0.15, 0.2, 0.3], // 数据
      //   type: "line",
      //   smooth: true, // 平滑曲线
      //   showSymbol: false, // 显示拐点
      //   lineStyle: {
      //     color: "rgba(162, 182, 185, 1)", // 线条颜色
      //     width: 1,
      //   },
      // },
      {
        name: "Data",
        type: "line",
        smooth: true, // 平滑曲线
        showSymbol: true, // 显示拐点
        symbol: "circle", // 拐点形状
        symbolSize: function (data: any, params: any) {
          // 只在索引为 2 的点显示拐点，其他点设置为 0
          return params.dataIndex === index ? 8 : 0;
        },

        itemStyle: {
          color: "#FFFFFF", // 拐点颜色
          borderColor: "#6AC287",
          borderWidth: 2,
        },
        lineStyle: {
          color: "#6AC287", // 线条颜色
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(106, 194, 135, 0.4)" }, // 渐变起点
            { offset: 1, color: "rgba(106, 194, 135, 0)" }, // 渐变终点
          ]),
        },
        markLine: {
          symbol: "none", // 去掉虚线末尾的箭头
          label: { show: false },
          data: [
            {
              xAxis: maxProfit.date?.substring(5), // 起点和终点的数据
              // yAxis: 0.15,
              lineStyle: {
                type: "dashed", // 虚线
                color: "rgba(106, 194, 135, 1)", // 线的颜色
                width: 1, // 线的宽度
              },
            },
            // 如果不需要交点上方的虚线，可以直接移除多余的数据项
          ],
        },
        data: data.map((item: any) => item.profit), // 数据
      },
    ],
  };

  useEffect(() => {
    if (!data?.length) return;
    const chartDom = document.getElementById("line-chart");
    const chart = echarts.getInstanceByDom(chartDom as any);
    if (chart) {
      chart.dispose();
    }
    const myChart = echarts.init(chartDom);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
    // 手动显示 tooltip
    myChart.dispatchAction({
      type: "showTip", // 显示 tooltip
      seriesIndex: 0, // 指定第一个 series
      dataIndex: index, // 指定展示第几个点的 tooltip，比如此处为 "June"
    });
  }, [JSON.stringify(data)]);

  return <div id="line-chart" className={styles.chart}></div>;
};

export default EchartLine;
