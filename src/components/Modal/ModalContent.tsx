import {
  useContext,
  ReactNode,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { ModalContext } from ".";
import { createPortal } from "react-dom";
import { modalContentCls } from "@consts/className";
import { popoverContentCls } from "@consts/className";

interface ModalContentProps {
  className?: string;
  children: ReactNode;
  fixed?: boolean;
}

const ModalContent = (props: ModalContentProps) => {
  const { open, onCloseModal, portalref } = useContext(ModalContext);
  const { className, children, fixed } = props;
  const [scrollY, setScrollY] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest(`.${popoverContentCls}`)
      ) {
        return;
      }
      onCloseModal();
    }
  };

  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (rootElement) {
      if (open) {
        document.addEventListener("click", handleClickOutside, {
          capture: true,
        });
        setScrollY(window.scrollY);
        rootElement.style.top = `-${scrollY}px`;
        rootElement.style.position = "fixed";
        window.scrollTo(0, 0);
      } else {
        rootElement.style.position = "";
        rootElement.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      }
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [open]);

  const cls = useMemo(
    () => (className ? `${className} ${modalContentCls}` : modalContentCls),
    [className]
  );

  return (
    <>
      {open &&
        createPortal(
          <div
            style={
              fixed
                ? {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }
                : {
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }
            }
            ref={contentRef}
            className={cls}
          >
            {children}
          </div>,
          portalref || document.body
        )}
    </>
  );
};

export default ModalContent;
