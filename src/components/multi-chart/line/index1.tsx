import React, { useEffect } from "react";
import * as echarts from "echarts";

import styles from "./index.module.css";

const EchartLine = () => {
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
                  <span style="font-weight: bold;">+${value}%</span><br/>
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
      data: ["April", "May", "June", "July", "August"], // 自定义月份
      axisLabel: {
        show: true, // 显示下方的标签
        position: "bottom", // 坐标轴标签位置在底部
        color: "rgba(115, 146, 151, 1)",
        fontSize: 12,
        fontFamily: "Roboto",
        fontWeight: "bold",
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
      }
      
    },
    yAxis: {
      type: "value",
      scale: true,
      max: 1,
      min: 0,
      splitNumber: 5, //max / splitNumber是间隔,
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
        formatter: "{value}%", // 添加百分号
        color: "rgba(115, 146, 151, 1)",
        fontSize: 12,
        fontFamily: "Roboto",
      },
    },
    series: [
      {
        name: "Data",
        type: "line",
        smooth: true, // 平滑曲线
        showSymbol: true, // 显示拐点
        symbol: "circle", // 拐点形状
        symbolSize: function (data: any, params: any) {
          // 只在索引为 2 的点显示拐点，其他点设置为 0
          return params.dataIndex === 4 ? 8 : 0;
        },
        itemStyle: {
          color: "#FFFFFF", // 拐点颜色
          borderColor: "#6AC287",
          borderWidth: 2,
        },
        lineStyle: {
          color: "#6AC287", // 线条颜色
          width: (i: number) => {
            return i > 3 ? 2 : 1

          },

        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(106, 194, 135, 0.4)" }, // 渐变起点
            { offset: 1, color: "rgba(106, 194, 135, 0)" }, // 渐变终点
          ]),
        },
        data: [0.2, 0.3, 0.42, 0.1, 0.15, 0.4], // 数据
       
      },
    ],
  };

  useEffect(() => {
    const chartDom = document.getElementById("line-chart1");
    const myChart = echarts.init(chartDom);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
    // 手动显示 tooltip
    myChart.dispatchAction({
      type: "showTip", // 显示 tooltip
      seriesIndex: 0, // 指定第一个 series
      dataIndex: 2, // 指定展示第几个点的 tooltip，比如此处为 "June"
    });
   
  }, []);

  return <div id="line-chart1" className={styles.chart}></div>;
};

export default EchartLine;
