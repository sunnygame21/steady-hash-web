"use client";
import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import Skeleton from "react-loading-skeleton";
import { maxBy } from "lodash";
import { getProfitParams, transProfit } from "@/utils/profit";
import { Profit } from "@/types/info";

import styles from "./index.module.css";

let first = true;

const Line = ({ title, productId }: any) => {
  const [data, setData] = useState<Profit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (!first) return;
      first = false;
      const { startDate, endDate, daysDifference } = getProfitParams(30);
      const { success, data = [] } = await fetch(
        `/api/user/daily-profit?startDate=${startDate}&endDate=${endDate}&productId=${productId}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      if (success) {
        setData(transProfit(data, daysDifference, startDate));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("get calendar data error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const max: any = maxBy(data, "profit")?.profit || 0;
      console.log("max", max);
      const option = {
        grid: {
          top: "5%", // 调整顶部的间距
          left: "0%",
          right: "0%",
          bottom: "0%",
        },
        xAxis: {
          type: "category",
          data: data.map((item, i) => i),

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
          max: max + 50,
          min: -50,
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
            // {
            //   gt: -max,
            //   lte: -1,
            //   color: "rgba(239, 71, 112, 1)",
            // },
            {
              gt: 0,
              lte: max + 1,
              color: "rgba(69, 179, 105, 1)",
            },
          ],
          outOfRange: {
            color: "rgba(69, 179, 105, 1)",
          },
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
                  return params.value >= 0
                    ? "rgba(69, 179, 105, 1"
                    : "rgba(239, 71, 112, 1)"; // 蓝色/红色
                },
              },
            },

            data: data.map((item) => item.profit),
          },
        ],
      };
      const chartDom = document.getElementById(`portfolioChart-${productId}`);
      const chart = echarts.getInstanceByDom(chartDom as any);
      if (chart) {
        chart.dispose();
      }
      const myChart = echarts.init(chartDom);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      option && myChart.setOption(option);
    }
  }, [data.length]);

  return loading ? (
    <Skeleton className={styles.lineSkeleton}></Skeleton>
  ) : data.length > 0 ? (
    <div id={`portfolioChart-${productId}`} className={styles.line}></div>
  ) : (
    <div className={styles.noData}></div>
  );
};

export default Line;
