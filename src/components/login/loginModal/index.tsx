import React, { useState, useRef, useContext } from "react";
import isEmail from "validator/lib/isEmail";
import { message } from "antd";
import { GlobalContext } from "@/app/state/global";
import { GoogleIcon } from "@/components/Icons";
import Modal from "@/components/modal";
import Loading from "@/components/loading";

import styles from "./index.module.css";


const LoginModal: React.FC<{ close: () => void }> = (props) => {
  const { close } = props;
  const inputRef = useRef<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.error('please input email!');
  };
  const [email, setEmail] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const ItemsNode = (
    <p className={styles.terms}>
      By Creating An Account You Agree With
      <br />
      Our <a href="#">Terms Of Service</a>, <a href="#">Privacy Policy</a>
    </p>
  );

  const onClose = () => {
    setEmail(false);
    setSuccess(false);
    close && close();
  };

  const showSuccess = () => {
    setEmail(false);
    setSuccess(true);
  };

  const emailLogin = async () => {
    const value = inputRef?.current?.value || "";
    if (value && isEmail(value)) {
      setLoading(true);
      // const data = await loginEmail(value);
      // if (data?.success) showSuccess();
      setLoading(false);
    } else {
      messageApi.error('please input email!');
    }
  };

  return (
    <Modal title="Sign Up To Steady" size="small" hiddenFooter close={onClose}>
       {contextHolder}
      <div className={styles.wrap}>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            ref={inputRef}
            placeholder="name@email.com"
          />
        </div>
        <button className={styles.createBtn} onClick={emailLogin}>
          Get Code
        </button>
        {ItemsNode}
      </div>
    </Modal>
  );
};

export default LoginModal;
