import { createContext, FC, ReactNode, useMemo } from "react";
import PopoverTrigger from "./PopoverTrigger";
import PopoverContent from "./PopoverContent";
import { PopoverBaseCls } from "../../consts/className";

interface PopoverCompoundProps {
  Trigger: typeof PopoverTrigger;
  Navigator: typeof PopoverContent;
}

interface PopoverContextProps {}

export const PopoverContext = createContext<PopoverContextProps>({});

interface PopoverProps {
  children: ReactNode;
  className?: string;
}

const Popover: FC<PopoverProps> & PopoverCompoundProps = (props) => {
  const { children, className } = props;

  const contextValue = {};

  const popoverCls = useMemo(
    () => (className ? `${className} ${PopoverBaseCls}` : PopoverBaseCls),
    []
  );
  return (
    <PopoverContext.Provider value={contextValue}>
      <div className={popoverCls}>{children}</div>
    </PopoverContext.Provider>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Navigator = PopoverContent;

export default Popover;
