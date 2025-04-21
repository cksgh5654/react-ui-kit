import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import AccordionItem from "./AccordionItem";
import AccordionTrigger from "./AccordionTrigger";
import AccordionContent from "./AccordionContent";
import { accordionBaseCls } from "@consts/className";

interface AccordionCompoundProps {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
}

interface AccordionContextProps {
  openItem: string[];
  setOpenItem: Dispatch<SetStateAction<string[]>>;
  chevronColor?: string;
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
  chevronColor?: string;
}

export const AccordionContext = createContext<AccordionContextProps>({
  openItem: [],
  setOpenItem: () => {},
  chevronColor: "#000000",
});

const Accordion: FC<AccordionProps> & AccordionCompoundProps = (props) => {
  const { children, className, chevronColor } = props;
  const [openItem, setOpenItem] = useState<string[]>([]);

  const contextValue = {
    openItem,
    setOpenItem,
    chevronColor,
  };

  const cls = useMemo(
    () => (className ? `${className} ${accordionBaseCls}` : accordionBaseCls),
    [className]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cls}>{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
