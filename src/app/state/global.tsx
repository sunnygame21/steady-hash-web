"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import Loading from "@/components/loading";

export interface Info {
  id?: string;
}

export interface GlobalState {
  user: any;
  fetchUserInfo: () => void;
  messageApi: any;
}

export const initialGlobalState: GlobalState = {
  user: null,
  fetchUserInfo: () => {},
  messageApi: {},
};

export const GlobalContext = createContext<GlobalState>(initialGlobalState);

export const GlobalProvider = ({ children }: any) => {
  const [user, setUser] = useState<Info | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

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
        router.push("/");
      } else {
        router.push("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    }),
    [JSON.stringify(user)]
  );

  return (
    <GlobalContext.Provider value={globalValue}>
      {contextHolder}
      {loading && <Loading />}
      {children}
    </GlobalContext.Provider>
  );
};
