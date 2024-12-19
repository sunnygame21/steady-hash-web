
"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

export interface Info {
  name?: string;
  guide?: string;
  vip?: string;
}

export interface GlobalState {
  user: any;
}

export const initialGlobalState: GlobalState = {
  user: null,
};

export const GlobalContext = createContext<GlobalState>(initialGlobalState);

let fetching = false;

export const GlobalProvider = ({ children }: any) => {
  const [user, setUser] = useState<Info | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const globalValue = useMemo(
    () => ({
      user,
    }),
    []
  );

  return (
    <GlobalContext.Provider value={globalValue}>
      {loading && <Loading />}
      {children}
    </GlobalContext.Provider>
  );
};
