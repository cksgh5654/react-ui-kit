import { useContext, useMemo } from "react";
import { SelectContext } from ".";
import { selectTirggerCls } from "@consts/className";
import ChevronIcon from "@ui/icon/ChevronIcon";

interface SelectTriggerProps {
  className?: string;
}

const SelectTrigger = (props: SelectTriggerProps) => {
  const { className } = props;
  const { item, selectId, triggerRef, chevronColor, isPopoverOpen } =
    useContext(SelectContext);

  const cls = useMemo(
    () => (className ? `${className} ${selectTirggerCls}` : selectTirggerCls),
    [className]
  );

  return (
    <button
      ref={triggerRef}
      popoverTarget={selectId}
      className={cls}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {item.label}
      <ChevronIcon
        color={chevronColor}
        style={{
          width: "24px",
          transition: "transform 0.3s ease",
          transform: `rotate(${isPopoverOpen ? 90 : -90}deg)`,
        }}
      />
    </button>
  );
};

export default SelectTrigger;
