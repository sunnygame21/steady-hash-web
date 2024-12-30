import { find } from "lodash";
import moment from "moment";

export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const jsonParse = (val: string) => {
  try {
    return JSON.parse(val) || {};
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const toLocaleString = (date: string) => {
  try {
    return new Date(date).toLocaleString("zh", {
      hour12: false,
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch (e) {
    console.log(e);
    return date;
  }
};

export const isIOS = () => {
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
};

export const getUniqueKey = (randomLength: number) => {
  return Number(
    Math.random().toString().substring(3, randomLength) + Date.now()
  ).toString(36);
};

export const formatAmount = (amount: number) => {
  if (amount === 0) {
    return "+0";
  }
  let str = "";
  if (amount > 0) {
    str = `+`;
  } else {
    str = "-";
  }

  if (amount >= 1000) {
    str = str + (amount / 1000).toFixed(2) + "k"; // 保留两位小数并加上 'k'
  } else {
    str = str + amount.toFixed(2); // 小于1000时直接显示
  }
  return addCommas(str);
};

export const sumProfit = (resList: any, days: number, start: string) => {
  const dayList = generateDays(days, start);
  if (!resList?.[0].length) {
    return dayList.map((item) => {
      return {
        dailyprofit: 0,
        date: item,
      };
    });
  }
  const sumRes = dayList.map((curDate, i) => {
    let dailyprofit = 0;
    resList.forEach((profit: any, j: number) => {
      const curDateData = find(profit, (item) => {
        console.log("item", moment(item?.date).format("YYYY-MM-DD"), curDate);
        return moment(item?.date).format("YYYY-MM-DD") === curDate;
      });
      console.log("profit", curDateData);
      dailyprofit += Number(curDateData?.dailyprofit || 0);
    });
    return {
      date: curDate,
      dailyprofit,
    };
  });
  return sumRes;
};

export const transProfit = (data: any, days: number, start: string) => {
  const dayList = generateDays(days, start);

  const res = dayList.map((date, i) => {
    const curDateData = find(data, (item) => {
      return moment(item?.date).format("YYYY-MM-DD") === date;
    });
    return {
      date,
      dailyprofit: Number(curDateData?.dailyprofit) || 0,
    };
  });
  return res;
};

export const generateDays = (days: number, start: string) => {
  const res = [];
  for (let i = 0; i < days; i++) {
    res.push(
      moment(start)
        .add(i + 1, "days")
        .format("YYYY-MM-DD")
    );
  }
  return res;
};

export const addCommas = (num: any) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
