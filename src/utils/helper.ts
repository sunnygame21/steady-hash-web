import { find, floor, round } from "lodash";
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
  if (!amount) {
    return "+0";
  }
  let str = "";
  if (amount > 0) {
    str = `+`;
  } else {
    str = '-'
  }

  if (amount >= 1000) {
    str = str + floor(amount / 1000, 2) + "k"; // 保留两位小数并加上 'k'
  } else {
    str = str + floor(amount, 2); // 小于1000时直接显示
  }
  return addCommas(str);
};

export const generateDays = (days: number, start: string) => {
  const res = [];
  for (let i = 0; i <= days; i++) {
    res.push(
      moment(start)
        .add(i, "days")
        .format("YYYY-MM-DD")
    );
  }
  return res;
};

export const addCommas = (num: any) => {
  if (!num) return 0;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const nextEvenNumber = (n: number) => {
  const res = round(n);
  // 如果是偶数，返回下一个偶数
  if (res % 2 === 0) {
    return res + 2;
  } else {
    // 如果是奇数，返回下一个偶数
    return res + 1;
  }
};
