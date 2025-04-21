import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import PopoverTrigger from "./PopoverTrigger";
import PopoverContent from "./PopoverContent";
import { popoverBaseCls } from "@consts/className";

interface PopoverCompoundProps {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
}

interface PopoverContextProps {
  triggerRect: DOMRect;
  setTriggerRect: Dispatch<SetStateAction<DOMRect>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position: "bottom-left" | "bottom-center" | "bottom-right";
  openPopover: () => void;
  closePopover: () => void;
  fixed?: boolean;
  chevronColor?: string;
}

export const PopoverContext = createContext<PopoverContextProps>({
  setTriggerRect: () => {},
  triggerRect: new DOMRect(),
  isOpen: false,
  setIsOpen: () => {},
  position: "bottom-left",
  openPopover: () => {},
  closePopover: () => {},
  fixed: false,
  chevronColor: "#000000",
});

interface PopoverProps {
  children: ReactNode;
  className?: string;
  position?: "bottom-left" | "bottom-center" | "bottom-right";
  fixed?: boolean;
  chevronColor?: string;
}

const Popover: FC<PopoverProps> & PopoverCompoundProps = (props) => {
  const {
    children,
    className,
    position = "bottom-left",
    fixed,
    chevronColor,
  } = props;
  const [triggerRect, setTriggerRect] = useState(new DOMRect());
  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  const contextValue = {
    triggerRect,
    setTriggerRect,
    isOpen,
    setIsOpen,
    position,
    openPopover,
    closePopover,
    fixed,
    chevronColor,
  };

  const cls = useMemo(
    () => (className ? `${className} ${popoverBaseCls}` : popoverBaseCls),
    [className]
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      <div className={cls}>{children}</div>
    </PopoverContext.Provider>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
