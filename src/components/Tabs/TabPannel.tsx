import { ReactNode, useContext, useMemo } from "react";
import { TabsContext } from ".";
import { tabsPannelBaseCls } from "../../consts/className";

interface TabPanelProps {
  index: number;
  children: ReactNode;
  className?: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { tabIndex } = useContext(TabsContext);
  const { index, children, className } = props;

  const tabsCls = useMemo(
    () => (className ? `${className} ${tabsPannelBaseCls}` : tabsPannelBaseCls),
    []
  );

  return tabIndex === index ? <div className={tabsCls}>{children}</div> : null;
};

export default TabPanel;
