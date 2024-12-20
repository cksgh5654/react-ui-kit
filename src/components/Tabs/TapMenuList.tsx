import { ReactNode } from "react";
import { tabsMenuListBaseCls } from "../../consts/className";

const TabMenuList = ({ children }: { children: ReactNode }) => {
  return <div className={tabsMenuListBaseCls}>{children}</div>;
};

export default TabMenuList;
