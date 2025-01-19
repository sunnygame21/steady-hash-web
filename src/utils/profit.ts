import { find, floor, groupBy, orderBy, round, sumBy, values } from "lodash";
import moment from "moment";
import { addCommas, generateDays } from "./helper";
import { Profit } from "@/types/info";
import { WEEKENDS } from "@/constant";

export const sumProfit = (
  resList: Profit[],
  allInvest: number,
  days: number
) => {
  const { startDate, daysDifference } = getProfitParams(days);
  const dayList = generateDays(daysDifference, startDate);
  const sumRes = dayList.map((curDate, i) => {
    let profit = 0;
    let weekend = 0;
    resList.forEach((list: any, j: number) => {
      const curDateData = find(list, (item) => {
        const date = moment(item?.date);
        weekend = date.weekday();
        return date.format("YYYY-MM-DD") === curDate;
      });
      profit = (curDateData?.profit || 0) + profit;
    });
    return {
      date: curDate,
      profit,
      percent: floor((profit / allInvest) * 100, 2),
      weekend: WEEKENDS[weekend],
      index: weekend,
    };
  });
  return sumRes;
};

export const transProfit = (data: Profit[], days: number, start: string) => {
  const dayList = generateDays(days, start);

  const res = dayList.map((date, i) => {
    const curDateData = find(data, (item) => {
      return moment(item?.date).format("YYYY-MM-DD") === date;
    });
    return {
      date,
      profit: floor(Number(curDateData?.profit) || 0, 2) || 0,
    };
  });
  return res;
};

export const getProfitParams = (days: number) => {
  const curDate = moment.utc().local();
  const startDate = moment(curDate)
    .subtract(days, "days")
    .format("YYYY-MM-DD");
  const endDate = moment(curDate).subtract(1, "days").format("YYYY-MM-DD");
  const daysDifference = moment(endDate).diff(moment(startDate), "days");
  return {
    startDate,
    endDate,
    daysDifference,
  };
};

export const transMonthProfit = (data: Profit[]) => {
  const list = data.map((item: any) => {
    return {
      profit: Number(item.profit),
      date: item.date.substring(0, 7),
    };
  });
  const group = groupBy(list, "date");
  const res = [];
  for (const date in group) {
    const monthData = group[date];
    const sum = floor(sumBy(monthData, "profit"), 2);
    res.push({
      date,
      profit: sum,
    });
  }

  return res;
};

export const calculateMaxNum = (maxProfit: number, sequence: number[]) => {
  // 默认为 10
  let result = sequence[0];

  // 遍历序列，找到符合条件的最大值
  for (let i = 0; i < sequence.length; i++) {
    const mul = sequence[i] * 1.5;
    if (maxProfit > sequence[i] && maxProfit <= mul) {
      result = mul;
      break;
    }
  }
  return maxProfit >= result ? maxProfit : result;
};
