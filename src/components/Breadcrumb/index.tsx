import {
  Children,
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import { breadcrumbBaseCls } from "@consts/className";
import BreadcrumbDropdown from "./BreadcrumbDropdown";
import ChevronIcon from "@ui/icon/ChevronIcon";

interface BreadcrumbCompoundProps {
  Item: typeof BreadcrumbItem;
}

interface BreadcrumbProps {
  width?: string;
  children: ReactNode;
  className?: string;
  chevronColor?: string;
}

interface BreadcrumbContextProps {
  totalWidth: number;
  setTotalWidth: Dispatch<SetStateAction<number>>;
}

export const BreadcrumbContext = createContext<BreadcrumbContextProps>({
  totalWidth: 0,
  setTotalWidth: () => {},
});

const Breadcrumb: FC<BreadcrumbProps> & BreadcrumbCompoundProps = ({
  width = "500px",
  children,
  className,
  chevronColor,
}) => {
  const [totalWidth, setTotalWidth] = useState(0);
  const [isSpillOver, setIsSpillOver] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const seperatorRef = useRef<SVGSVGElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);

  const childArray = Children.toArray(children);
  const firstItem = childArray[0];
  const lastItem = childArray[childArray.length - 1];
  const middleItems = childArray.slice(1, -1);

  const contextValue = { totalWidth, setTotalWidth };

  const cls = useMemo(
    () => (className ? `${className} ${breadcrumbBaseCls}` : breadcrumbBaseCls),
    [className]
  );

  const items = childArray.map((item, index) => (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      key={index}
    >
      {item}
      {index < childArray.length - 1 && (
        <ChevronIcon
          color={chevronColor}
          ref={seperatorRef}
          style={{ rotate: "180deg", width: "32px" }}
        />
      )}
    </span>
  ));

  useEffect(() => {
    setTotalWidth(
      (prev) =>
        prev + (seperatorRef.current?.getBoundingClientRect().width || 0)
    );
  }, []);

  useEffect(() => {
    const widthNumber = parseInt(width, 10);
    setIsSpillOver(totalWidth > widthNumber);
  }, [totalWidth, width]);

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <div
        style={{
          width,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
        className={cls}
      >
        {isSpillOver ? (
          <>
            <span>{firstItem}</span>
            <ChevronIcon
              color={chevronColor}
              style={{ rotate: "180deg", width: "32px" }}
            />
            <span
              ref={toggleRef}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              ...
            </span>
            <ChevronIcon
              color={chevronColor}
              style={{ rotate: "180deg", width: "32px" }}
            />
            <span>{lastItem}</span>
          </>
        ) : (
          items
        )}
        {isDropdownOpen && (
          <BreadcrumbDropdown
            onClose={() => setIsDropdownOpen(false)}
            anchorRef={toggleRef as React.RefObject<HTMLElement>}
          >
            {middleItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </BreadcrumbDropdown>
        )}
      </div>
    </BreadcrumbContext.Provider>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
