"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button, message } from "antd";
import LoginModal from "./loginModal";

import styles from "./index.module.css";
import { BackIcon, BlackBackIcon } from "../Icons";

const Codebox = dynamic(() => import("react-otp-input"), { ssr: false });

const Code = () => {
  useEffect(() => {}, []);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <span>Steady</span>
        Hash Capital
      </div>
      <div className={styles.title}>Welcome to SteadyHash</div>
      <div className={styles.desc}>
        We are a professional quantitative trading platform, integrating diverse
        algorithmic trading strategies for you to choose from.
      </div>
      <div className={styles.button} onClick={() => setShowLogin(true)}>
        Continue With Email
      </div>
      <div className={styles.info}>
        <div>
          Don’t have an account?<span> Take a look</span>
        </div>
      </div>
      {showLogin && <LoginModal close={() => setShowLogin(false)}></LoginModal>}
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
          <div className={styles.confirm}>Continue</div>
        </div>
      )}
    </div>
  );
};

export default Code;
