import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Fragment,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { defaultContext } from "./useModal";
import Modal from "./index";

export type ModalContext = {
  modal: ModalProps;
  show: (options: ModalOptions, children: ReactNode) => ModalProps;
  close: () => void;
} | null;

export type ModalOptions = Omit<ModalProps, "confirm" | "close" | "children">;

export type ModalProps = {
  title: string;
  children: ReactNode;
  className?: string;
  confirm?: () => void;
  close?: () => void;
  confirmText?: string;
  cancelText?: string;
  view?: string;
  viewText?: string;
  onClose?: () => any;
  onConfirm?: () => any;
  footer?: any;
};

export const ModalProvider = ({
  children,
  context: Context = defaultContext,
}: any) => {
  const root = useRef(null);
  const modalContextRef = useRef<ModalContext>(null);
  const [modal, setModal] = useState<ModalProps | any>(null);

  useEffect(() => {
    // @ts-ignore
    root.current = document.createElement("div");
    // @ts-ignore
    root.current.id = "__modal__";
     // @ts-ignore
    document.body.appendChild(root.current);

    return () => {
      if (root.current) {
        document.body.removeChild(root.current);
      }
    };
  }, []);

  const close = useCallback(() => {
    setModal(null);
  }, []);

  const show = useCallback(
    (options: ModalOptions, children: ReactNode) => {
      const _modal: ModalProps = {
        ...options,
        close() {
          if (options.onClose) {
            options.onClose();
          }
          close();
        },
        ...(options.onConfirm && {
          confirm() {
            options.onConfirm && options.onConfirm();
            close();
          },
        }),
        children,
      };

      setModal(_modal);
      return _modal;
    },
    [close]
  );

  modalContextRef.current = {
    modal,
    show,
    close,
  };

  return (
    <Context.Provider value={modalContextRef.current}>
      {children}
      {root.current &&
        createPortal(
          <Fragment>{modal ? <Modal {...modal} /> : null}</Fragment>,
          root.current
        )}
    </Context.Provider>
  );
};
