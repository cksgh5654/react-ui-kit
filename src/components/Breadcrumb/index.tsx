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
import { breadcrumbBaseCls } from "../../consts/className";

interface BreadcrumbCompoundProps {
  Item: typeof BreadcrumbItem;
}

interface BreadcrumbProps {
  width?: string;
  children: ReactNode;
  className?: string;
}

interface BreadcrumbContextProps {
  totalWidth: number;
  setTotalWidth: Dispatch<SetStateAction<number>>;
}

export const BreadcrumbContext = createContext<BreadcrumbContextProps>({
  totalWidth: 0,
  setTotalWidth: () => {},
});

const Breadcrumb: FC<BreadcrumbProps> & BreadcrumbCompoundProps = (props) => {
  const { width = "500px", children, className } = props;
  const [totalWidth, setTotalWidth] = useState(0);
  const [isSpillOver, setIsSpillOver] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const seperatorRef = useRef<HTMLSpanElement>(null);

  const breadcrumbCls = useMemo(
    () => (className ? `${className} ${breadcrumbBaseCls}` : breadcrumbBaseCls),
    []
  );

  const contextValue = {
    totalWidth,
    setTotalWidth,
  };

  const items = Children.toArray(children).map((item, index, arr) => {
    return (
      <span key={index}>
        {item}
        {index < arr.length - 1 && <span ref={seperatorRef}>&gt;</span>}
      </span>
    );
  });

  const childArray = Children.toArray(children);
  const firstItem = childArray[0];
  const lastItem = childArray[childArray.length - 1];
  const middleItems = childArray.slice(1, -1);

  useEffect(() => {
    setTotalWidth(
      (prev) =>
        prev + (seperatorRef.current?.getBoundingClientRect().width || 0)
    );
  }, []);

  useEffect(() => {
    const widthNumber = parseInt(width, 10);
    if (totalWidth > widthNumber) {
      setIsSpillOver(true);
    } else {
      setIsSpillOver(false);
    }
  }, [totalWidth, width]);

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <div style={{ width: width }} className={breadcrumbCls}>
        {isSpillOver ? (
          <>
            <span>{firstItem}</span>
            <span>&gt;</span>
            <span
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              ...
            </span>
            <span>&gt;</span>
            <span>{lastItem}</span>
          </>
        ) : (
          items
        )}
      </div>
      {isDropdownOpen && (
        <div>
          {middleItems.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
      )}
    </BreadcrumbContext.Provider>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
