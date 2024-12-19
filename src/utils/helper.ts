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
  let str = "";
  if (amount >= 0) {
    str = `+`;
  } else {
    str = "-";
  }

  if (amount >= 1000) {
    str = str + (amount / 1000).toFixed(2) + "k"; // 保留两位小数并加上 'k'
  } else {
    str = str + amount.toFixed(2); // 小于1000时直接显示
  }
  return str;
};
