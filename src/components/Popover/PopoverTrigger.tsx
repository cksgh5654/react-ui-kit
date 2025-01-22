import { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { popoverTriggerCls } from "../../consts/className";
import { PopoverContext } from ".";

interface PopoverTriggerProps {
  className?: string;
  children?: ReactNode;
}

const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { setTriggerRect, setIsOpen, isOpen } = useContext(PopoverContext);
  const { className, children } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const calculateTriggerRect = () => {
    if (!buttonRef.current) return;
    setTriggerRect(buttonRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    calculateTriggerRect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", calculateTriggerRect);
    }

    return () => {
      window.removeEventListener("resize", calculateTriggerRect);
    };
  }, [isOpen]);

  const popoverCls = useMemo(
    () => (className ? `${className} ${popoverTriggerCls}` : popoverTriggerCls),
    []
  );

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button onClick={handleClick} ref={buttonRef} className={popoverCls}>
      {children ? children : "Open"}
    </button>
  );
};
export default PopoverTrigger;
