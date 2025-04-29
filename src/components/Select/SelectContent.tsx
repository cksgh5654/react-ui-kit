import { ReactNode, useContext, useMemo } from "react";
import { selectContentCls } from "@consts/className";
import { SelectContext } from ".";

interface SelectContentProps {
  children: ReactNode;
  className?: string;
  selectId?: string;
}

const SelectContent = (props: SelectContentProps) => {
  const { children, className } = props;
  const { selectId, popoverRef, isPopoverOpen } = useContext(SelectContext);

  const cls = useMemo(
    () => (className ? `${className} ${selectContentCls}` : selectContentCls),
    [className]
  );

  return (
    <div
      ref={popoverRef}
      id={selectId}
      popover="auto"
      className={cls}
      style={{ margin: "0px", display: isPopoverOpen ? "block" : "none" }}
    >
      {children}
    </div>
  );
};

export default SelectContent;
