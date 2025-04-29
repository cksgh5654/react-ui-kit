import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SelectTrigger from "./SelectTrigger";
import SelectContent from "./SelectContent";
import SelectItem from "./SelectItem";
import { selectBaseCls } from "@consts/className";

interface SelectCompoundProps {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
}

type SelectedItem = {
  label: ReactNode;
  value: string;
};

interface SelectContextProps {
  value: string;
  onChange: (selectedValue: string) => void;
  item: SelectedItem;
  setItem: Dispatch<SetStateAction<SelectedItem>>;
  selectId: string;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  chevronColor?: string;
  isPopoverOpen: boolean;
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
}

export const SelectContext = createContext<SelectContextProps>({
  value: "",
  onChange: () => {},
  item: { label: "선택하세요", value: "" },
  setItem: () => {},
  selectId: "",
  popoverRef: { current: null },
  triggerRef: { current: null },
  chevronColor: "#000000",
  isPopoverOpen: false,
  setIsPopoverOpen: () => {},
});

interface SelectProps {
  children: ReactNode;
  className?: string;
  onChange: (selectedValue: string) => void;
  value: string;
  item?: SelectedItem;
  setItem?: Dispatch<SetStateAction<SelectedItem>>;
  selectId: string;
  chevronColor?: string;
  placement?: "bottom" | "top" | "left" | "right";
}

const Select: FC<SelectProps> & SelectCompoundProps = (props) => {
  const {
    children,
    className,
    onChange,
    value,
    item: propItem,
    setItem: propSetItem,
    selectId,
    chevronColor,
    placement = "bottom",
  } = props;
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [internalItem, setInternalItem] = useState<SelectedItem>(
    propItem || { label: "선택하세요", value: "" }
  );

  const item = propItem || internalItem;
  const setItem = propSetItem || setInternalItem;

  const updatePopoverPosition = () => {
    if (popoverRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popover = popoverRef.current;

      popover.style.position = "absolute";

      if (placement === "bottom") {
        popover.style.top = `${triggerRect.bottom + window.scrollY}px`;
        popover.style.left = `${triggerRect.left + window.scrollX}px`;
      } else if (placement === "top") {
        popover.style.top = `${
          triggerRect.top - popover.offsetHeight + window.scrollY
        }px`;
        popover.style.left = `${triggerRect.left + window.scrollX}px`;
      } else if (placement === "left") {
        popover.style.top = `${triggerRect.top + window.scrollY}px`;
        popover.style.left = `${
          triggerRect.left - popover.offsetWidth + window.scrollX
        }px`;
      } else if (placement === "right") {
        popover.style.top = `${triggerRect.top + window.scrollY}px`;
        popover.style.left = `${triggerRect.right + window.scrollX}px`;
      }
    }
  };

  useEffect(() => {
    updatePopoverPosition();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updatePopoverPosition);
    });

    if (triggerRef.current) {
      resizeObserver.observe(triggerRef.current);
    }

    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(updatePopoverPosition);
    });

    if (triggerRef.current && triggerRef.current.parentElement) {
      mutationObserver.observe(triggerRef.current.parentElement, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("resize", updatePopoverPosition);
    window.addEventListener("scroll", updatePopoverPosition);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", updatePopoverPosition);
      window.removeEventListener("scroll", updatePopoverPosition);
    };
  }, [placement]);

  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    const handleToggle = (event: Event) => {
      const toggleEvent = event as ToggleEvent;
      setIsPopoverOpen(toggleEvent.newState === "open");
    };

    popover.addEventListener("toggle", handleToggle);
    return () => {
      popover.removeEventListener("toggle", handleToggle);
    };
  }, []);

  const contextValue = {
    value,
    onChange,
    item,
    setItem,
    selectId,
    popoverRef,
    triggerRef,
    chevronColor,
    isPopoverOpen,
    setIsPopoverOpen,
  };

  const cls = useMemo(
    () => (className ? `${className} ${selectBaseCls}` : selectBaseCls),
    [className]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cls}>{children}</div>
    </SelectContext.Provider>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;

export default Select;
