import {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { popoverContentCls } from "../../consts/className";
import { PopoverContext } from ".";
import { createPortal } from "react-dom";

interface PopoverContentProps {
  className?: string;
  children: ReactNode;
}

const PopoverContent = (props: PopoverContentProps) => {
  const { isOpen, setIsOpen, position, triggerRect } =
    useContext(PopoverContext);
  const { className, children } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside, { capture: true });
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const contentPosition = (): CSSProperties => {
    if (position === "bottom-left")
      return {
        position: "absolute",
        top: `${triggerRect.bottom}px`,
        left: `${triggerRect.left}px`,
      };
    if (position === "bottom-center")
      return {
        position: "absolute",
        top: `${triggerRect.bottom}px`,
        left: `${triggerRect.left + triggerRect.width / 2}px`,
      };
    if (position === "bottom-right")
      return {
        position: "absolute",
        top: `${triggerRect.bottom}px`,
        left: `${triggerRect.right}px`,
      };
    return {
      position: "absolute",
      top: `${triggerRect.bottom}px`,
      left: `${triggerRect.left}px`,
    };
  };

  const popoverCls = useMemo(
    () => (className ? `${className} ${popoverContentCls}` : popoverContentCls),
    []
  );
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            id="my-popover"
            style={contentPosition()}
            ref={contentRef}
            className={popoverCls}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};
export default PopoverContent;
