"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { create, all } from "mathjs";
import { message } from "antd";
import { add, find, forIn, sumBy } from "lodash";
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
  holder: any[];
  fetchHolder: () => void;
  changeUser: (id: string) => void;
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
  holder: [],
  fetchHolder: () => {},
  changeUser: () => {},
};

let first = true;
let curUserId: any = undefined;
export const GlobalContext = createContext<GlobalState>(initialGlobalState);

export const GlobalProvider = ({ children }: any) => {
  const [user, setUser] = useState<Info | null>();
  const [preUser, setPreUser] = useState<Info | null>();

  const [loading, setLoading] = useState<boolean>(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [productsList, setList] = useState<any>([]);
  const [userShares, setShare] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [sevenDaysSumData, setSevenDaysData] = useState<Profit[]>([]);
  const [productProfitData, setProductProfitData] = useState<any>({});
  const [holder, setHolder] = useState([]);

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
        curUserId = data?.id;
        await fetchShare();
        fetchSevenData();
        fetchProducts();
        if (user?.role) {
        }
        fetchHolder();
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

  const fetchHolder = async () => {
    try {
      const { success, data = [] } = await fetch(`/api/user/holder`, {
        method: "GET",
      })
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      console.log("fetchHolder", data);
      if (success) {
        setHolder(data);
      }
      setChartLoading(false);
    } catch (error) {
      setChartLoading(false);
      console.log("get calendar data error", error);
    }
  };

  const changeUser = async (vaUserId: string) => {
    try {
      const { success, data } = await fetch(`/api/assume-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vaUserId }),
      })
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      console.log("changeUser", data);
      if (success) {
        document.cookie = `${process.env.NEXT_PUBLIC_COOKIE_NAME}=${data?.token}`;
        const curUser = find(holder, (item: any) => item?.id === vaUserId);
        setUser(curUser);
        router.refresh();
      }
      setChartLoading(false);
    } catch (error) {
      setChartLoading(false);
      console.log("get calendar data error", error);
    }
  };

  useEffect(() => {
    console.log("curUser", user?.id, curUserId);
    if (curUserId !== user?.id || !user?.id) {
      fetchUserInfo();
    }
  }, [user?.id]);

  useEffect(() => {
    let query = page;
    if (first) {
      query = transParams(searchParams);
      query && setPage(query);
    }
    first = false;
    router.replace(query ? `${path}?${query}` : path);
  }, [page]);

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
      holder,
      fetchHolder,
      changeUser,
    }),
    [
      chartLoading,
      JSON.stringify(user),
      JSON.stringify(productsList),
      JSON.stringify(userShares),
      JSON.stringify(sevenDaysSumData),
      JSON.stringify([productProfitData, page]),
      JSON.stringify(holder),
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
