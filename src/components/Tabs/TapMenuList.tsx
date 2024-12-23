import { ReactNode, useMemo } from "react";
import { tabsMenuListBaseCls } from "../../consts/className";

interface TabMenuListProps {
  children: ReactNode;
  className?: string;
}

const TabMenuList = (props: TabMenuListProps) => {
  const { children, className } = props;

  const tabsCls = useMemo(
    () =>
      className ? `${className} ${tabsMenuListBaseCls}` : tabsMenuListBaseCls,
    []
  );

  return <div className={tabsCls}>{children}</div>;
};

export default TabMenuList;
