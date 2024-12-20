import React, { useEffect } from "react";
import * as echarts from "echarts";

import styles from "./index.module.css";

const EchartLine = () => {
  const option = {
    grid: {
      top: '5%',   // 调整顶部的间距
      left: '16%',
      right: '5%',
      bottom: '10%'
    },
    tooltip: {
      trigger: "axis",
      triggerOn: 'none',
      backgroundColor: "#2E3A5A", // 自定义tooltip背景
      borderRadius: 8,
      padding: [10, 15],
      textStyle: {
        color: "#FFFFFF", // 文本颜色
        fontSize: 14,
      },
      formatter: function (params: any) {
        // 自定义内容
        const value = params[0].value;
        const month = params[0].name;
        return `<div style="text-align: center;">
                  <span style="font-size: 16px; font-weight: bold;">+${value}%</span><br/>
                  <span>${month.toUpperCase()}</span>
                </div>`;
      },
    },
    title: {
      show: false
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLabel: {
        show: true, // 显示下方的标签
        position: "bottom", // 坐标轴标签位置在底部
        color: 'rgba(115, 146, 151, 1)',
        fontSize: 12,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      },
      axisTick: {
        show:false
      },
      axisLine: {
        show: false, // 显示 x 轴轴线
      },
     
    },
    yAxis: {
      type: "value",
      scale: true,
      max: 1,
      min: 0,
      splitNumber: 5, //max / splitNumber是间隔,
      inverse: false, // 确保坐标轴方向正常
      splitLine: {
        show: true, // 显示分隔线
        lineStyle: {
          type: 'dashed', // 设置线条类型为虚线
          color: 'rgba(45, 91, 98, 1)'
        }
      },
      axisLabel: {
        show: true,
        formatter: "{value}%", // 添加百分号
        color: 'rgba(115, 146, 151, 1)',
        fontSize: 12,
        fontFamily: 'Roboto'
      },
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
     
      pieces: [
        {
          gt: 1,
          lt: 3,
          color: '#FC7D02',
          borderColor: 'red',
        },
        {
          gt: 5,
          lt: 7,
          color: 'transparent'
        }
      ]
    },
    
    series: [
      {
        data: [0.2, 0.3, 0.4, 0.6, 0.8, 0.3, 0.5],
        type: "line",
        smooth: true,
        symbol: "circle", // 拐点形状
        symbolSize: function (data: any, params: any) {
          // 只在索引为 2 的点显示拐点，其他点设置为 0
          return params.dataIndex === 2 ? 8 : 0;
        },
      },
      {
        data: [0.2, 0.3, 0.4, 0.6, 0.8, 0.3,0.5],
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(106, 194, 135, 0.4)' }, // 起始颜色
            { offset: 0.8, color: 'rgba(106, 194, 135, 0)' }    // 结束颜色
          ]),
          origin: 'start',
          shadowOffsetX: 2
         
        },
        itemStyle: {
          color: "#FFFFFF", // 拐点颜色
          borderColor: "#6AC287",
          borderWidth: 2,
        },
        lineStyle: {
          width: 2,
          color: 'rgba(106, 194, 135, 1)'
        },
       
        
       
      },
     
    ],
  };

  useEffect(() => {
    const chartDom = document.getElementById("line-chart");
    const myChart = echarts.init(chartDom);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  }, []);

  return <div id="line-chart" className={styles.chart}></div>;
};

export default EchartLine;
