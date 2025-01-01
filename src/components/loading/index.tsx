import React from "react";
import loading from "@/images/loading.gif";
import { classNames } from "@/utils/helper";
import styles from "./index.module.css";

const Loading: React.FC<{ text?: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <div className={classNames("global-loading",styles.wrap, className)}>
   
      <div className={styles.loading}></div>
      <p className={styles.desc}>{text || "loading..."}</p>
    </div>
  );
};

const PartialLoading = () => {
  return (
    <div className={styles.partialWrap}>
      <img src={loading.src} alt="" className={styles.img} />
    </div>
  );
};

export default Loading;
export { PartialLoading };
