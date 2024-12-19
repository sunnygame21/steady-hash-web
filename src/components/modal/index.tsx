import React from "react";
import { classNames } from "@/utils/helper";
import { CloseIcon } from "@/components/Icons";

import styles from "./index.module.css";

interface ModalProps {
  title: string;
  close: () => void;
  confirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
  hiddenFooter?: boolean;
  size?: "small" | "middle" | "large";
}

const Modal = (props: ModalProps) => {
  const {
    title,
    close,
    confirm,
    confirmText,
    cancelText,
    children,
    hiddenFooter,
    size,
  } = props;

  return (
    <div className={styles.modalWrap}>
      <div className={classNames(styles.content, size)}>
        <div className={styles.title}>
          <p>{title}</p>
          <CloseIcon className={styles.closeIcon} onClick={close} />
        </div>
        <div className={styles.desc}>{children}</div>
        {!hiddenFooter ? (
          <div className={styles.footer}>
            <div
              className={classNames(styles.cancelBtn, "hover:opacity-80")}
              onClick={close}
            >
              {cancelText || 'cancel'}
            </div>
            <div
              className={classNames(styles.confirmBtn, "hover:opacity-80")}
              onClick={confirm}
            >
              {confirmText || 'confirm'}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Modal;
