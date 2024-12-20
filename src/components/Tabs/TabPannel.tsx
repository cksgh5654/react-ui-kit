import { ReactNode, useContext } from "react";
import { TabsContext } from ".";
import { tabsPannelBaseCls } from "../../consts/className";

interface TabPanelProps {
  index: number;
  children: ReactNode;
}

const TabPanel = ({ index, children }: TabPanelProps) => {
  const { tabIndex } = useContext(TabsContext);

  return tabIndex === index ? (
    <div className={tabsPannelBaseCls}>{children}</div>
  ) : null;
};

export default TabPanel;
