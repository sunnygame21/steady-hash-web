import React, { useState, useRef, useContext } from "react";
import isEmail from "validator/lib/isEmail";
import { GlobalContext } from "@/app/state/global";
import { classNames } from "@/utils/helper";
import Modal from "@/components/modal";

import styles from "./index.module.css";


const LoginModal: React.FC<{
  close: () => void;
  getCode: (email: string) => void;
  setEmail: (email: string) => void;
}> = (props) => {
  const { close, getCode, setEmail } = props;
  const inputRef = useRef<any>(null);
  const { messageApi } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);

  const ItemsNode = (
    <p className={styles.terms}>
      By Creating An Account You Agree With
      <br />
      Our <a href="#">Terms Of Service</a>, <a href="#">Privacy Policy</a>
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
      await getCode(value);
      setLoading(false);
    } else {
      messageApi.error("Please Input Email!");
    }
  };

  return (
    <Modal title="Sign Up To Steady" size="small" hiddenFooter close={onClose}>
      <div className={styles.wrap}>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            ref={inputRef}
            placeholder="name@email.com"
            disabled={loading}
          />
        </div>
        <button className={classNames(styles.createBtn)} onClick={emailLogin}>
          {loading && <div className="loading"></div>}
          Get Code
        </button>
        {ItemsNode}
      </div>
    </Modal>
  );
};

export default LoginModal;
