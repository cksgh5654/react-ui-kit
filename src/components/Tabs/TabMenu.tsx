import { ReactNode, useContext, useMemo } from "react";
import { TabsContext } from ".";
import { tabsMenuBaseCls } from "../../consts/className";

interface TabMenuProps {
  index: number;
  children: ReactNode;
}

const TabMenu = ({ index, children }: TabMenuProps) => {
  const { handleClick, tabIndex } = useContext(TabsContext);

  const isActive = useMemo(() => tabIndex === index, [tabIndex, index]);

  return (
    <div
      className={tabsMenuBaseCls}
      data-active={isActive}
      onClick={() => handleClick(index)}
    >
      <button>{children}</button>
    </div>
  );
};

export default TabMenu;
