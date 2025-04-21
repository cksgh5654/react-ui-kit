import { createContext, FC, ReactNode, useMemo } from "react";
import ModalBackdrop from "./ModalBackdrop";
import ModalContent from "./ModalContent";
import ModalTrigger from "./ModalTrigger";
import ModalClose from "./ModalClose";
import { modalBaseCls } from "@consts/className";

interface ModalCompoundProps {
  Backdrop: typeof ModalBackdrop;
  Trigger: typeof ModalTrigger;
  Content: typeof ModalContent;
  Close: typeof ModalClose;
}

interface ModalContextProps {
  onCloseModal: () => void;
  onOpenModal: () => void;
  open: boolean;
  portalref: HTMLElement | null;
}

export const ModalContext = createContext<ModalContextProps>({
  onCloseModal: () => {},
  onOpenModal: () => {},
  open: false,
  portalref: null,
});

interface ModalProps {
  children: ReactNode;
  className?: string;
  onCloseModal: () => void;
  onOpenModal?: () => void;
  open: boolean;
  portalref?: HTMLElement | null;
}

const Modal: FC<ModalProps> & ModalCompoundProps = (props) => {
  const { children, className, onCloseModal, onOpenModal, open, portalref } =
    props;

  const contextValue = {
    onCloseModal,
    onOpenModal: onOpenModal || (() => {}),
    open,
    portalref: portalref || null,
  };

  const cls = useMemo(
    () => (className ? `${className} ${modalBaseCls}` : modalBaseCls),
    [className]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      <div className={cls}>{children}</div>
    </ModalContext.Provider>
  );
};

Modal.Backdrop = ModalBackdrop;
Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Close = ModalClose;

export default Modal;
