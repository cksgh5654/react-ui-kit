import { createContext, FC, ReactNode, useMemo } from "react";
import { modalBaseCls } from "../../consts/className";
import ModalBackdrop from "./ModalBackdrop";
import ModalContent from "./ModalContent";
import ModalTrigger from "./ModalTrigger";
import ModalClose from "./ModalClose";

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
}

export const ModalContext = createContext<ModalContextProps>({
  onCloseModal: () => {},
  onOpenModal: () => {},
  open: false,
});

interface ModalProps {
  children: ReactNode;
  className?: string;
  onCloseModal: () => void;
  onOpenModal: () => void;
  open: boolean;
}

const Modal: FC<ModalProps> & ModalCompoundProps = (props) => {
  const { children, className, onCloseModal, onOpenModal, open } = props;

  const contextValue = {
    onCloseModal,
    onOpenModal,
    open,
  };

  const modalCls = useMemo(
    () => (className ? `${className} ${modalBaseCls}` : modalBaseCls),
    []
  );

  return (
    <ModalContext.Provider value={contextValue}>
      <div className={modalCls}>{children}</div>
    </ModalContext.Provider>
  );
};

Modal.Backdrop = ModalBackdrop;
Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Close = ModalClose;

export default Modal;
