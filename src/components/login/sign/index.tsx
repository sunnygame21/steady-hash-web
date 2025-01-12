import React, { useState, useRef, useContext, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import { Dropdown, MenuProps } from "antd";
import { GlobalContext } from "@/app/state/global";
import { classNames } from "@/utils/helper";
import {
  AppleIcon,
  ArrowIcon,
  BlackBackIcon,
  GoogleIcon,
} from "@/components/Icons";

import styles from "./index.module.css";
import { uniq } from "lodash";

const HistoryKey = "steady-email-history";

const LoginModal: React.FC<{
  close: () => void;
  getCode: (email: string) => void;
  setEmail: (email: string) => void;
  email?: string;
}> = (props) => {
  const { close, getCode, setEmail, email } = props;
  const inputRef = useRef<any>(null);
  const { messageApi } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const ItemsNode = (
    <p className={styles.terms}>
      By sign in, you agree to
      <br />
      Our <a href="#">Terms Of Service</a> and <a href="#">Privacy Policy</a>
    </p>
  );

  const onClose = () => {
    setEmail("");
    close && close();
  };

  const emailLogin = async () => {
    const value = inputRef?.current?.value || "";
    if (value && isEmail(value)) {
      setLoading(true);
      const list = uniq([value, ...history])
      setHistory(list);
      localStorage.setItem(HistoryKey, JSON.stringify(list));
      await getCode(value);
      setLoading(false);
    } else {
      messageApi.error("Please Input Email!");
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(HistoryKey) || "[]");
    if (data.length) {
      setHistory(uniq(data));
    }
  }, []);

  const items: MenuProps["items"] = history.map((item) => {
    return {
      key: item,
      label: <span key={item}>{item}</span>,
      onClick: () => {
        inputRef.current.value = item;
      },
    };
  });



  return (
    <div className={classNames(styles.emailWrap)}>
      <BlackBackIcon className={styles.back} onClick={onClose} />
      <p className={styles.title}>Sign In to SteadyHash</p>
      <div className={styles.loginType}>
        <button className={styles.google} disabled>
          <GoogleIcon /> Google
        </button>
        <button className={styles.apple} disabled>
          <AppleIcon /> Apple
        </button>
      </div>
      <div className={styles.signDesc}>
        <span></span>
        <p>Or sign in with email</p>
        <span></span>
      </div>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        className={styles.drop}
        disabled={!history.length}
      >
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            ref={inputRef}
            placeholder="name@email.com"
            disabled={loading}
          />
          {history.length > 0 ? <ArrowIcon className={styles.arrow} /> : null}
        </div>
      </Dropdown>

      <button className={classNames(styles.createBtn)} onClick={emailLogin}>
        {loading && <div className="loading"></div>}
        Sign In
      </button>
      {ItemsNode}
    </div>
  );
};

export default LoginModal;
