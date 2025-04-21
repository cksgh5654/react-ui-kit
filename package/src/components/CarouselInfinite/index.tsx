import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  FC,
  useMemo,
  useRef,
  useEffect,
} from "react";
import CarouselItemContainer from "./CarouselInfiniteItemContainer";
import CarouselItemList from "./CarouselInfiniteItemList";
import CarouselItem from "./CarouselInfiniteItem";
import CarouselNavigator from "./CarouselInfiniteNavigator";
import { carouselInfiniteBaseCls } from "@consts/className";
import { carouselInfiniteItemCls } from "@consts/className";

interface CarouselInfiniteCompoundProps {
  ItemContainer: typeof CarouselItemContainer;
  ItemList: typeof CarouselItemList;
  Item: typeof CarouselItem;
  Navigator: typeof CarouselNavigator;
}

interface CarouselInfiniteContextProps {
  itemLength: number;
  setItemLength: Dispatch<SetStateAction<number>>;
  carouselIndex: number;
  setCarouselIndex: Dispatch<SetStateAction<number>>;
  transition: boolean;
  setTransition: Dispatch<SetStateAction<boolean>>;
  displayIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  isTransitioning: boolean;
  setIsTransitioning: Dispatch<SetStateAction<boolean>>;
  itemWidth: number;
  setItemWidth: Dispatch<SetStateAction<number>>;
  containerWidth: number;
  dragOffset: number;
  setDragOffset: Dispatch<SetStateAction<number>>;
}

interface CarouselInfiniteProps {
  children: ReactNode;
  className?: string;
}

export const CarouselInfiniteContext =
  createContext<CarouselInfiniteContextProps>({
    itemLength: 0,
    setItemLength: () => {},
    carouselIndex: 1,
    setCarouselIndex: () => {},
    transition: true,
    setTransition: () => {},
    displayIndex: 1,
    handlePrev: () => {},
    handleNext: () => {},
    isTransitioning: false,
    setIsTransitioning: () => {},
    itemWidth: 0,
    setItemWidth: () => {},
    containerWidth: 0,
    dragOffset: 0,
    setDragOffset: () => {},
  });

const CarouselInfinite: FC<CarouselInfiniteProps> &
  CarouselInfiniteCompoundProps = (props) => {
  const [carouselIndex, setCarouselIndex] = useState<number>(1);
  const [itemLength, setItemLength] = useState<number>(0);
  const [transition, setTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const { children, className } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const firstItem = container.querySelector(
          `.${carouselInfiniteItemCls}`
        ) as HTMLElement;
        if (firstItem) {
          const itemWidth = firstItem.getBoundingClientRect().width;
          const containerWidth = container.getBoundingClientRect().width;
          setItemWidth(itemWidth);
          setContainerWidth(containerWidth);
        }
      }
    };

    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, [children]);

  const displayIndex = useMemo(() => {
    if (carouselIndex === 0) {
      return itemLength;
    } else if (carouselIndex > itemLength) {
      return 1;
    } else {
      return carouselIndex;
    }
  }, [carouselIndex, itemLength]);

  const extendeditemLength = itemLength + 2;

  const handlePrev = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex - 1 + extendeditemLength) % extendeditemLength
    );
    setTransition(true);
    setIsTransitioning(true);
    setDragOffset(0);
  };

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % extendeditemLength);
    setTransition(true);
    setIsTransitioning(true);
    setDragOffset(0);
  };

  const contextValue = {
    itemLength,
    setItemLength,
    carouselIndex,
    setCarouselIndex,
    transition,
    setTransition,
    displayIndex,
    handlePrev,
    handleNext,
    isTransitioning,
    setIsTransitioning,
    itemWidth,
    setItemWidth,
    containerWidth,
    dragOffset,
    setDragOffset,
  };

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselInfiniteBaseCls}`
        : carouselInfiniteBaseCls,
    [className]
  );

  return (
    <CarouselInfiniteContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cls}
        style={{ overflow: "hidden", width: "100%" }}
      >
        {children}
      </div>
    </CarouselInfiniteContext.Provider>
  );
};

CarouselInfinite.ItemContainer = CarouselItemContainer;
CarouselInfinite.ItemList = CarouselItemList;
CarouselInfinite.Item = CarouselItem;
CarouselInfinite.Navigator = CarouselNavigator;

export default CarouselInfinite;
