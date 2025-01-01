import { find, groupBy, round, sumBy, values } from "lodash";
import moment from "moment";
import { addCommas, generateDays } from "./helper";
import { Profit } from "@/types/info";

export const formatAmount = (amount: number) => {
  if (!amount) {
    return "+0";
  }
  let str = "";
  if (amount > 0) {
    str = `+`;
  }

  if (amount >= 1000) {
    str = str + (amount / 1000).toFixed(2) + "k"; // 保留两位小数并加上 'k'
  } else {
    str = str + amount.toFixed(2); // 小于1000时直接显示
  }
  return addCommas(str);
};

export const sumProfit = (resList: Profit[], days: number, start: string) => {
  const dayList = generateDays(days, start);
  const sumRes = dayList.map((curDate, i) => {
    let profit = 0;
    resList.forEach((profit: any, j: number) => {
      const curDateData = find(profit, (item) => {
        return moment(item?.date).format("YYYY-MM-DD") === curDate;
      });
      profit += Number(curDateData?.profit || 0);
    });
    return {
      date: curDate,
      profit,
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
      profit: Number(curDateData?.profit) || 0,
    };
  });
  return res;
};

export const getProfitParams = (days: number) => {
  const curDate = moment.utc().local();
  const startDate = moment(curDate)
    .subtract(days + 1, "days")
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
    const sum = sumBy(monthData, "profit");
    res.push({
      date,
      profit: sum,
    });
  }

  return res;
};
