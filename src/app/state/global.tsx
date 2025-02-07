"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { create, all } from "mathjs";
import { message } from "antd";
import { add, forIn, sumBy } from "lodash";
import Loading from "@/components/loading";
import { Info, Product, Profit, Share } from "@/types/info";
import { getProfitParams } from "@/utils/profit";
import { transParams } from "@/utils/helper";

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
  logout: any;
  page: string;
  setPage: (page: string) => void;
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
  logout: () => {},
  page: "",
  setPage: () => {},
};

let first = true;
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

  // 保存每个页面的路由
  const [page, setPage] = useState<string>("");

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const logout = () => {
    document.cookie = `${process.env.NEXT_PUBLIC_COOKIE_NAME}=''`;
    fetchUserInfo();
    window.location.replace("/login");
  };

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
        fetchSevenData();
        fetchProducts();
        path === "/login" && router.push("/");
      } else {
        router.push("/login");
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
        const allMoney = add(allInvest, allProfit);
        setShare(data);
        setUser((prev) => {
          return {
            ...prev,
            allInvest,
            allProfit,
            allMoney,
            balance: 0,
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

  const fetchSevenData = async () => {
    try {
      const { startDate, endDate } = getProfitParams(7);
      const { success, data = [] } = await fetch(
        `/api/user/daily-profit?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      if (success) {
        setSevenDaysData(data);
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

  useEffect(() => {
    let query = page;
    if (first) {
      query = transParams(searchParams);
      query && setPage(query)
    }
    first = false;
    router.replace(query ? `${path}?${query}` : path);
  }, [page]);

  console.log('query', page, first)

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
      logout,
      page,
      setPage,
    }),
    [
      JSON.stringify(user),
      JSON.stringify(productsList),
      JSON.stringify(userShares),
      chartLoading,
      JSON.stringify(sevenDaysSumData),
      JSON.stringify([productProfitData, page]),
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
