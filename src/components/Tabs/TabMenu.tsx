import { ReactNode, useContext, useMemo } from "react";
import { TabsContext } from ".";
import { tabsMenuBaseCls } from "../../consts/className";

interface TabMenuProps {
  index: number;
  children: ReactNode;
  className?: string;
}

const TabMenu = (props: TabMenuProps) => {
  const { handleClick, tabIndex } = useContext(TabsContext);
  const { index, children, className } = props;

  const isActive = useMemo(() => tabIndex === index, [tabIndex, index]);

  const tabsCls = useMemo(
    () => (className ? `${className} ${tabsMenuBaseCls}` : tabsMenuBaseCls),
    []
  );

  return (
    <div
      className={tabsCls}
      data-active={isActive}
      onClick={() => handleClick(index)}
    >
      <button>{children}</button>
    </div>
  );
};

export default TabMenu;
