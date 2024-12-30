"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";
import { get, maxBy } from "lodash";
import { addCommas } from "@/utils/helper";
import tipBg from "@/images/common/portfolio-chart-top-bg.png";

import styles from "./index.module.css";

const Bar = ({ title, id, data }: any) => {
  useEffect(() => {
    if (data.length) {
      const max = get(maxBy(data, "dailyprofit"), "dailyprofit", 0);
      const y = data.map((item: any) => {
        if (max === item.dailyprofit) {
          return {
            value: item.dailyprofit,
            itemStyle: {
              color: "black",
              borderRadius: [1, 1, 0, 0],
            },
            label: {
              show: true, // 显示数据标签
              position: "top", // 标签位置（柱子顶部）
              formatter: `{a|$${addCommas(item.dailyprofit)}}`,
              color: "#FF6F61", // 文本颜色
              rich: {
                a: {
                  backgroundColor: {
                    image: tipBg.src,
                  },
                  padding: [3, 5, 6, 5],
                  width: 30,
                  color: "#fff",
                  fontSize: 8,
                  align: "center",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                },
              },
            },
          };
        }
        return item.dailyprofit || 1;
      });
      const option = {
        tooltip: { show: false },
        grid: {
          top: "2%", // 调整顶部的间距
          left: "0%",
          right: "0%",
          bottom: "5%",
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7"],
          axisLine: {
            show: false, // 显示 x 轴轴线
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
          max: (max + 50).toFixed(0),
          min: 0,
          splitNumber: 10, //max / splitNumber是间隔,
          inverse: false, // 确保坐标轴方向正常
          boundaryGap: 0, // 控制类目轴的起始位置，true 表示柱状图从第一个类别开始显示
          splitLine: {
            show: false, // 显示分隔线
            lineStyle: {
              type: "dashed", // 设置线条类型为虚线
              color: "rgba(55, 65, 81, 1)",
            },
          },
        },
        series: [
          {
            name: "2015",
            type: "bar",
            data: y,
            barWidth: 6,
            itemStyle: {
              color: "rgba(209, 213, 219, 1)",
              borderRadius: [1, 1, 0, 0],
            },
          },
        ],
      };
      const chartDom = document.getElementById(id);
      const chart = echarts.getInstanceByDom(chartDom as any);
      if (chart) {
        chart.dispose();
      }
      const myChart = echarts.init(chartDom);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      option && myChart.setOption(option);
    }
  }, [data.length]);

  return <div id={id} className={styles.bar}></div>;
};

export default Bar;
