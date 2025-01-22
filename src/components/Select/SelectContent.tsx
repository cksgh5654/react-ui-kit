import { ReactNode, useMemo } from "react";
import { selectContentCls } from "../../consts/className";
import Popover from "../Popover";

interface SelectContentProps {
  children: ReactNode;
  className?: string;
}

const SelectContent = (props: SelectContentProps) => {
  const { children, className } = props;

  const cls = useMemo(
    () => (className ? `${className} ${selectContentCls}` : selectContentCls),
    [className]
  );

  return <Popover.Content className={cls}>{children}</Popover.Content>;
};
export default SelectContent;
