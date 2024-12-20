"use client";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GlobalContext } from "@/app/state/global";
import logo from "/public/login-logo.png";
import LoginModal from "./loginModal";
import { BackIcon, BlackBackIcon } from "../Icons";

import styles from "./index.module.css";

const Codebox = dynamic(() => import("react-otp-input"), { ssr: false });

const Code = () => {
  const { fetchUserInfo, messageApi } = useContext(GlobalContext);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState("");

  const getCode = async (email: string) => {
    setEmail(email);
    const { success, data } = await fetch("/api/user/email-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .catch(() => ({ success: false }));
    if (success && data) {
      setShowCode(true);
      setShowLogin(false);
    }
  };

  const loginByCode = async () => {
    const { success, data } = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, verifyCode: code }),
    })
      .then((res) => res.json())
      .catch(() => ({ success: false }));
    if (success) {
      const { access_token } = data || {};
      document.cookie = `${process.env.NEXT_PUBLIC_COOKIE_NAME}=${access_token}`;
      await fetchUserInfo();
      messageApi.success("Login success!");
    }
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <img src={logo.src}></img>
        
      </div>
      <div className={styles.title}>Welcome to SteadyHash</div>
      <div className={styles.desc}>
        We are a professional quantitative trading platform, integrating diverse
        algorithmic trading strategies for you to choose from.
      </div>
      <div className={styles.button} onClick={() => setShowLogin(true)}>
      Sign in with Email
      </div>
      <div className={styles.info}>
        <div>
          Don’t have an account?<span> Take a look</span>
        </div>
      </div>
      {showLogin && (
        <LoginModal
          close={() => setShowLogin(false)}
          getCode={getCode}
          setEmail={setEmail}
        ></LoginModal>
      )}
      {showCode && (
        <div className={styles.codeWrap}>
          <BlackBackIcon className={styles.back} />
          <div className={styles.codeTitle}>Authentication Code</div>
          <div className={styles.codeDesc}>
            Enter the 6-digit code we just sent to your email,
            user@steadyhash.ai
          </div>
          <Codebox
            value={code}
            onChange={setCode}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={styles.codeInput}
            containerStyle={styles.codeBox}
          />
          <div className={styles.confirm} onClick={loginByCode}>
            Continue
          </div>
        </div>
      )}
    </div>
  );
};

export default Code;
