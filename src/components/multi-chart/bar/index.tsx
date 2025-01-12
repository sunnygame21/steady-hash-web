import React, { useContext, useEffect, useState } from "react";
import * as echarts from "echarts";
import { get, maxBy, round, sumBy } from "lodash";
import Skeleton from "react-loading-skeleton";
import { GlobalContext } from "@/app/state/global";
import { calculateMaxNum, sumProfit } from "@/utils/profit";
import { UNIT_NUMBER, UNIT_PERCENT } from "@/constant";
import { ProfitIcon } from "@/components/Icons";

import styles from "./index.module.css";

const EchartsBar = () => {
  const { chartLoading, userShares, user } = useContext(GlobalContext);

  const profitList = sumProfit(
    userShares.map((item: any) => item.data),
    user.allInvest,
    7
  );

  const maxProfit = maxBy(profitList, "profit");
  const maxNum = calculateMaxNum(maxProfit?.profit || 0, UNIT_NUMBER);
  const maxPercent = calculateMaxNum(
    maxProfit?.percent || 0,
    UNIT_PERCENT
  ).toFixed(1);

  useEffect(() => {
    if (userShares.length) {
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
          data: profitList.map((item) => item.weekend),
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
            margin: 12,
          },
        },
        yAxis: [
          {
            type: "value",
            max: maxNum,
            min: 0,
            splitNumber: 2,
            inverse: false, // 确保坐标轴方向正常
            boundaryGap: 0, // 控制类目轴的起始位置，true 表示柱状图从第一个类别开始显示
            axisLine: {
              show: false, // 隐藏y轴线
            },
            axisLabel: {
              show: false,
            },
            showMinLine: {
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
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: profitList.map((item) => item.profit),
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
            data: profitList.map((item) => item.percent),
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
      const chartDom = document.getElementById("bar-chart");
      const chart = echarts.getInstanceByDom(chartDom as any);
      if (chart) {
        chart.dispose();
      }
      const myChart = echarts.init(chartDom);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      option && myChart.setOption(option);
    }
  }, [userShares.length]);

  return (
    <div className={styles.barWrap}>
      <div className={styles.detailInfo}>
        <p className={styles.title}>Total Value</p>
        <p className={styles.num}>${user.allMoney}</p>
        <p className={styles.desc}>
          <ProfitIcon />
          <span>
            {(((maxProfit?.profit || 0) / user.allInvest) * 100).toFixed(2)}
            %&ensp;
          </span>
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
