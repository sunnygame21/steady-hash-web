import React, {
  useContext,
  useMemo,
  createContext,
  forwardRef,
  Context,
} from "react";
import { ModalContext } from "./ModalProvider";

export const defaultContext = createContext<ModalContext>(null);

export const useModal = (context?: Context<ModalContext>) => {
  const modalContext = useContext<ModalContext>(context || defaultContext);

  const modal = useMemo(() => {
    return modalContext;
  }, [modalContext]);

  return modal as any;
};

export const withmodal =
  (Context = defaultContext) =>
  (WrappedComponent: any) => {
    const WithModal = (props: any, forwardedRef: any) => (
      <Context.Consumer>
        {(modal) => (
          <WrappedComponent ref={forwardedRef} {...props} modal={modal} />
        )}
      </Context.Consumer>
    );

    WithModal.displayName = `WithModal(${
      WrappedComponent.displayName || WrappedComponent.name || "Modal"
    })`;

    return forwardRef(WithModal);
  };
