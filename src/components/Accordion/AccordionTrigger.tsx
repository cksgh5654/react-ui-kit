import { accordionTriggerCls } from "@consts/className";
import { ReactNode, useContext, useMemo } from "react";
import { AccordionContext } from ".";
import { AccordionItemContext } from "./AccordionItem";
import ChevronIcon from "@ui/icon/ChevronIcon";

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
  chevron?: boolean;
}

const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { children, className, chevron } = props;
  const { openItem, setOpenItem, chevronColor } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);

  const cls = useMemo(
    () =>
      className ? `${className} ${accordionTriggerCls}` : accordionTriggerCls,
    [className]
  );

  return (
    <button
      onClick={() =>
        setOpenItem(
          openItem.includes(value)
            ? openItem.filter((item) => item !== value)
            : (prev) => [...prev, value]
        )
      }
      className={cls}
    >
      {children}
      {chevron && (
        <ChevronIcon
          color={chevronColor}
          style={{
            width: "32px",
            transform: openItem.includes(value)
              ? "rotate(90deg)"
              : "rotate(-90deg)",
            transition: "transform 0.3s ease",
          }}
        />
      )}
    </button>
  );
};

export default AccordionTrigger;
