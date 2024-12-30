"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { message } from "antd";
import { add, sumBy } from "lodash";
import Loading from "@/components/loading";
import { Info, Product, Share } from "@/types/info";
import { addCommas, sumProfit, transProfit } from "@/utils/helper";

export interface GlobalState {
  user: any;
  fetchUserInfo: () => void;
  messageApi: any;
  productsList: Product[];
  userShares: Share[];
  chartLoading: boolean;
  sevenDaysSumData: any[];
  product7DaysData: any;
}

export const initialGlobalState: GlobalState = {
  user: null,
  fetchUserInfo: () => {},
  messageApi: {},
  productsList: [],
  userShares: [],
  chartLoading: true,
  sevenDaysSumData: [],
  product7DaysData: {},
};

export const GlobalContext = createContext<GlobalState>(initialGlobalState);

export const GlobalProvider = ({ children }: any) => {
  const [user, setUser] = useState<Info | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [productsList, setList] = useState<any>([]);
  const [userShares, setShare] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [sevenDaysSumData, setSevenDaysData] = useState<any>([]);
  const [product7DaysData, setProduct7DaysData] = useState<any>({});
  const router = useRouter();
  const path = usePathname();

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/profile`, {
        method: "GET",
      })
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      const { data = {}, success } = res || {};
      if (success) {
        setUser({ ...data, showName: data?.username?.split("@")[0] });
        await fetchShare();
        fetchProducts();
        path === "/login" && router.push("/");
      } else {
        router.push("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products`, {
        method: "GET",
      })
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      const { data = [], success, err } = res || {};
      if (success) {
        setList(data);
      } else {
        message.error(err);
      }
    } catch (error) {
      console.log("fetchProducts", error);
    }
  };

  const fetchShare = async () => {
    try {
      const res = await fetch(`/api/user/share`, {
        method: "GET",
      })
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      const { data = [], success, err } = res || {};
      if (success) {
        const allInvest = sumBy(data, "shareAmount");
        const allProfit = sumBy(data, "profit");
        const allMoney = addCommas(add(allInvest, allProfit));
        setShare(data);
        fetch7DaysData(data);
        setUser((prev) => {
          return {
            ...prev,
            allInvest: addCommas(allInvest),
            allProfit: addCommas(allProfit),
            allMoney,
          };
        });
      } else {
        message.error(err);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("fetchShare", error);
    }
  };

  const fetch7DaysData = async (data: any) => {
    try {
      setChartLoading(true);
      const curDate = moment.utc().local();
      const startDate = moment(curDate)
        .subtract(7, "days")
        .format("YYYY-MM-DD");
      const endDate = moment(curDate).subtract(0, "days").format("YYYY-MM-DD");
      const daysDifference = moment(endDate).diff(moment(startDate), "days");
      const allPromise = data.map((share: any) => {
        return fetch(
          `/api/user/profit?productId=${share.productId}&startDate=${startDate}&endDate=${endDate}`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .catch(() => ({ success: false }));
      });
      const allRes = await Promise.allSettled(allPromise);
      const allData: any = {};
      const resList = allRes
        .filter((item: any, i) => {
          if (item.value.data) {
            allData[data[i].productId] = transProfit(
              item.value.data,
              daysDifference,
              startDate
            );
          }

          return item.status === "fulfilled";
        })
        .map((item: any) => item.value.data);
      const sumRes = sumProfit(resList, daysDifference, startDate);
      setSevenDaysData(sumRes);
      setProduct7DaysData(allData);
      setChartLoading(false);
    } catch (error) {
      setChartLoading(false);
      console.log("get calendar data error", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const globalValue = useMemo(
    () => ({
      user,
      fetchUserInfo,
      messageApi,
      productsList,
      userShares,
      chartLoading,
      sevenDaysSumData,
      product7DaysData,
    }),
    [
      JSON.stringify(user),
      JSON.stringify(productsList),
      JSON.stringify(userShares),
      chartLoading,
      JSON.stringify(sevenDaysSumData),
      JSON.stringify(product7DaysData),
    ]
  );

  return (
    <GlobalContext.Provider value={globalValue}>
      {contextHolder}
      {loading && <Loading />}
      {children}
    </GlobalContext.Provider>
  );
};
