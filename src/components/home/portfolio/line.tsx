"use client";
import React, { memo, useEffect, useState } from "react";
import * as echarts from "echarts";
import Skeleton from "react-loading-skeleton";
import { maxBy } from "lodash";
import { getProfitParams, transProfit } from "@/utils/profit";
import { Profit } from "@/types/info";

import styles from "./index.module.css";

const getMaxValue = (number: number) => {
  // 将数字转换为字符串
  const numString = number.toString();

  // 如果是小数，返回1
  if (numString.includes(".")) {
    return 1;
  }

  // 如果是整数，返回10的整数位数次方
  const integerPart = numString.split(".")[0]; // 整数部分
  return Math.pow(10, integerPart.length);
};

const Line = ({ title, product }: any) => {
  const [data, setData] = useState<Profit[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      // setLoading(true)
      // const { startDate, endDate, daysDifference } = getProfitParams(30);
      // const { success, data = [] } = await fetch(
      //   `/api/user/product-profit?startDate=${startDate}&endDate=${endDate}&productId=${product?.productId}`,
      //   {
      //     method: "GET",
      //   }
      // )
      //   .then((res) => res.json())
      //   .catch(() => ({ success: false }));
      // if (success) {

      // }
      // setLoading(false);
      const { startDate, endDate, daysDifference } = getProfitParams(30);
      const res = transProfit(product.data, daysDifference, startDate);
      let profit = 0;
      const lineData = res.map((item) => {
        profit = profit + (item.profit / product.shareAmount) * 100;
        return {
          ...item,
          profit: profit,
        };
      });
      setData(lineData);
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
      const option = {
        grid: {
          top: "5%", // 调整顶部的间距
          left: "0%",
          right: "0%",
          bottom: "10%",
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
          max: getMaxValue(max),
          min: 0,
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
      const chartDom = document.getElementById(
        `portfolioChart-${product?.productId}`
      );
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
  ) : (
    <div
      id={`portfolioChart-${product?.productId}`}
      className={styles.line}
    ></div>
  );
};

export default memo(Line);
