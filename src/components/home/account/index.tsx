import React, { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { floor } from "lodash";
import { motion } from "framer-motion";
import { GlobalContext } from "@/app/state/global";
import { getYesterdayProfit, transBarProfit } from "@/utils/profit";
import { addCommas, classNames } from "@/utils/helper";

import styles from "./index.module.css";
import {
  AccountCalenderIcon,
  AccountHeadIcon,
  BackBlackIcon,
  ExchangeIcon,
} from "@/components/Icons";
import isEmail from "validator/lib/isEmail";
import moment from "moment";
import { Status } from "@/constant";
import Loading from "@/components/loading";

const Account = ({ onClose }: any) => {
  const { user, fetchHolder, holder, changeUser, messageApi } =
    useContext(GlobalContext);

  const inputRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createVA = async () => {
    const value = inputRef?.current?.value || "";
    try {
      if (value && isEmail(value)) {
        setLoading(true);

        const { success, data, err } = await fetch("/api/create-va", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: value }),
        })
          .then((res) => res.json())
          .catch(() => ({ success: false }));
        if (success) {
          await fetchHolder();
        }
        err && messageApi.error(err);
        console.log("createVA", data);
      }
    } catch (error) {
      console.log("createVA", error);
    }
  };

  if (!user?.id) return null;

  return (
    <div className={styles.wrap}>
      {
        loading && <Loading />
     }
      <div className={styles.title}>
        <BackBlackIcon className={styles.close} onClick={onClose} />
        <h3 className={styles.head}>Asset Detail </h3>
      </div>
      <div className={styles.accountList}>
        {holder.map((item) => {
          const subUser = item.subUser || {};
          return (
            <div className={styles.accountItem} key={item.id}>
              <div className={styles.top}>
                <div className={styles.icon}>
                  <AccountHeadIcon />
                </div>
                <div className={styles.mid}>
                  <p className={styles.name}>
                    {subUser?.username?.split("@")[0]}
                  </p>
                  <p className={styles.desc}>
                    Client since {moment(item?.createAt).format("YYYY-MM-DD")}
                  </p>
                </div>
                <div className={classNames(styles.right, styles[item?.status])}>
                  {item?.status}
                </div>
              </div>
              {item?.status === Status.active && (
                <div className={styles.bottom}>
                  <AccountCalenderIcon
                    onClick={async () => {
                      setLoading(true);
                      await changeUser(subUser?.id);
                      setLoading(false);
                      onClose();
                    }}
                  />
                  <p className={styles.num}>
                    <ExchangeIcon />
                    $11,000
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <input
        className={styles.input}
        ref={inputRef}
        placeholder="name@email.com"
        disabled={loading}
      />

      <div className={styles.createBtn} onClick={createVA}>
        Create New VA
      </div>
    </div>
  );
};

export default Account;
