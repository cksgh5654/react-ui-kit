import { useContext, useMemo } from "react";
import { ModalContext } from ".";
import { modalBackdropCls } from "../../consts/className";
import { createPortal } from "react-dom";

interface ModalBackdropProps {
  className?: string;
}

const ModalBackdrop = (props: ModalBackdropProps) => {
  const { open } = useContext(ModalContext);
  const { className } = props;
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
              width: "100vw",
              height: "100vh",
              position: "absolute",
              backgroundColor: "black",
              opacity: "0.2",
            }}
            className={cls}
          ></div>,
          document.body
        )}
    </>
  );
};

export default ModalBackdrop;
