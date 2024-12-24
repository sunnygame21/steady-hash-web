import React, { useEffect } from "react";
import * as echarts from "echarts";
import { ProfitIcon } from "@/components/Icons";

import styles from "./index.module.css";


const EchartsBar = () => {
  const option = {
    legend: {
      show: false
    },
    tooltip: {},
    grid: {
      top: '5%',   // 调整顶部的间距
      left: '5%',
      right: '5%',
      bottom: '30%'
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7'],
      nameTextStyle: {
        fontSize: 12,
        color: 'rgba(162, 182, 185, 1)',

      },
      axisLine: {
        show: true, // 显示 x 轴轴线
        lineStyle: {
          type: 'dashed', // 将轴线设置为虚线
          color: 'rgba(55, 65, 81, 1)'
        }
      },
      axisTick: {
        show:false
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      max: 10,
      min: 0,
      splitNumber: 2, //max / splitNumber是间隔,
      inverse: false, // 确保坐标轴方向正常
      boundaryGap: true, // 控制类目轴的起始位置，true 表示柱状图从第一个类别开始显示
      splitLine: {
        show: true, // 显示分隔线
        lineStyle: {
          type: 'dashed', // 设置线条类型为虚线
          color: 'rgba(55, 65, 81, 1)'
        }
      }
    },
    series: [
      {
        name: '2015',
        type: 'bar',
        data: [3.3, 3.1, 6.4, 2.4],
        barWidth: 10,
        itemStyle: {
          color: "rgba(255, 216, 74, 1)",
          borderRadius: [2,2, 0, 0],
        },
      },
      {
        name: '2016',
        type: 'bar',
        data: [5.8, 3.4, 5.2, 3.9],
        barWidth: 10,
        itemStyle: {
          color: "rgba(55, 65, 81, 1)",
          borderRadius: [2, 2, 0, 0],
        },
      },
    
    ]
  };

  useEffect(() => {
    const chartDom = document.getElementById("mainbar");
    const myChart = echarts.init(chartDom);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.detailInfo}>
        <p className={styles.title}>Total Value</p>
        <p className={styles.num}>$18,908.00</p>
        <p className={styles.desc}><ProfitIcon /> <span>4.78% (+0.20%) </span>  vs Last week</p>
      </div>
      <div id="mainbar" className={styles.bar}></div>
    </div>
  );
};

export default EchartsBar;
