import { useContext, useMemo } from "react";
import { selectTirggerCls } from "../../consts/className";
import Popover from "../Popover";
import { SelectContext } from ".";

interface SelectTriggerProps {
  className?: string;
}

const SelectTrigger = (props: SelectTriggerProps) => {
  const { className } = props;
  const { item } = useContext(SelectContext);

  const cls = useMemo(
    () => (className ? `${className} ${selectTirggerCls}` : selectTirggerCls),
    [className]
  );

  return <Popover.Trigger className={cls}>{item.label}</Popover.Trigger>;
};
export default SelectTrigger;
