import { ReactNode, useContext, useMemo } from "react";
import { ModalContext } from ".";
import { createPortal } from "react-dom";
import { modalBackdropCls } from "@consts/className";

interface ModalBackdropProps {
  className?: string;
  children?: ReactNode;
}

const ModalBackdrop = (props: ModalBackdropProps) => {
  const { open, portalref } = useContext(ModalContext);
  const { className, children } = props;
  const cls = useMemo(
    () => (className ? `${className} ${modalBackdropCls}` : modalBackdropCls),
    [className]
  );

  return (
    <>
      {open &&
        createPortal(
          <div
            style={{
              top: 0,
              width: "100vw",
              height: "100vh",
              position: "fixed",
            }}
            className={cls}
          >
            {children}
          </div>,
          portalref || document.body
        )}
    </>
  );
};

export default ModalBackdrop;
