"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { create, all } from "mathjs";
import { message } from "antd";
import { add, sumBy } from "lodash";
import Loading from "@/components/loading";
import { Info, Product, Profit, Share } from "@/types/info";
import { addCommas } from "@/utils/helper";
import { getProfitParams, sumProfit, transProfit } from "@/utils/profit";

export const mathjs = create(all);
mathjs.config({ number: "BigNumber", precision: 20 });
export interface GlobalState {
  user: any;
  fetchUserInfo: () => void;
  messageApi: any;
  productsList: Product[];
  userShares: Share[];
  chartLoading: boolean;
  sevenDaysSumData: any[];
  productProfitData: any;
  setProductProfitData: any;
}

export const initialGlobalState: GlobalState = {
  user: null,
  fetchUserInfo: () => {},
  messageApi: {},
  productsList: [],
  userShares: [],
  chartLoading: true,
  sevenDaysSumData: [],
  productProfitData: {},
  setProductProfitData: () => {},
};

export const GlobalContext = createContext<GlobalState>(initialGlobalState);

export const GlobalProvider = ({ children }: any) => {
  const [user, setUser] = useState<Info | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [productsList, setList] = useState<any>([]);
  const [userShares, setShare] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [sevenDaysSumData, setSevenDaysData] = useState<Profit[]>([]);
  const [productProfitData, setProductProfitData] = useState<any>({});

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
        fetch7DaysData();
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
      const res = await fetch(`/api/products/list`, {
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
        const { startDate, endDate, daysDifference } = getProfitParams(7);
        const profitList: any = [];
        const shares = data.map((item: Share) => {
          const trans = transProfit(item.data, daysDifference, startDate);
          profitList.push(trans);
          return {
            ...item,
            data: trans,
          };
        });
        sumProfit(
          profitList.map((item: any) => item.data),
          daysDifference,
          startDate
        );
        setShare(shares);
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

  const fetch7DaysData = async () => {
    try {
      setChartLoading(true);
      const { startDate, endDate, daysDifference } = getProfitParams(7);
      const { success, data = [] } = await fetch(
        `/api/user/daily-profit?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      if (success) {
        setSevenDaysData(transProfit(data, daysDifference, startDate));
      }
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
      productProfitData,
      setProductProfitData,
    }),
    [
      JSON.stringify(user),
      JSON.stringify(productsList),
      JSON.stringify(userShares),
      chartLoading,
      JSON.stringify(sevenDaysSumData),
      JSON.stringify([productProfitData]),
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
