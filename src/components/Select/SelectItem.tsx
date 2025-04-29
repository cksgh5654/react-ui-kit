import { ReactNode, useContext, useMemo } from "react";
import { SelectContext } from ".";
import { selectItemCls } from "@consts/className";

interface SelectItemProps {
  children: ReactNode;
  className?: string;
  value: string;
}

const SelectItem = (props: SelectItemProps) => {
  const { children, className, value } = props;
  const { setItem, onChange, popoverRef } = useContext(SelectContext);

  const handleClick = () => {
    setItem({ label: children, value });
    onChange(value);
    popoverRef.current?.hidePopover();
  };

  const cls = useMemo(
    () => (className ? `${className} ${selectItemCls}` : selectItemCls),
    [className]
  );

  return (
    <div onClick={handleClick} className={cls} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};
export default SelectItem;
