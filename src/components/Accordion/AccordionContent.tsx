import { accordionContentCls } from "@consts/className";
import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AccordionContext } from ".";
import { AccordionItemContext } from "./AccordionItem";

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  const { openItem } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);
  const isOpen = openItem.includes(value);

  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    }
  }, [isOpen, children]);

  const cls = useMemo(() => {
    const base = className
      ? `${className} ${accordionContentCls}`
      : accordionContentCls;
    return base;
  }, [className]);

  return (
    <div
      ref={contentRef}
      className={cls}
      style={{
        maxHeight,
        overflow: "hidden",
        transition: "max-height 0.3s ease",
      }}
    >
      <div
        style={{
          paddingTop: isOpen ? "8px" : "0",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionContent;
