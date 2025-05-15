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
import CarouselInfiniteIndicator from "./CarouselInfiniteIndicator";
import { carouselInfiniteBaseCls } from "@consts/className";
import { carouselInfiniteItemCls } from "@consts/className";

interface CarouselInfiniteCompoundProps {
  ItemContainer: typeof CarouselItemContainer;
  ItemList: typeof CarouselItemList;
  Item: typeof CarouselItem;
  Navigator: typeof CarouselNavigator;
  Indicator: typeof CarouselInfiniteIndicator;
}

interface CarouselInfiniteContextProps {
  itemLength: number;
  setItemLength: Dispatch<SetStateAction<number>>;
  carouselIndex: number;
  setCarouselIndex: Dispatch<SetStateAction<number>>;
  transition: boolean;
  setTransition: Dispatch<SetStateAction<boolean>>;
  handlePrev: () => void;
  handleNext: () => void;
  isTransitioning: boolean;
  setIsTransitioning: Dispatch<SetStateAction<boolean>>;
  itemWidth: number;
  setItemWidth: Dispatch<SetStateAction<number>>;
  containerWidth: number;
  dragOffset: number;
  setDragOffset: Dispatch<SetStateAction<number>>;
  chevronColor?: string;
}

interface CarouselInfiniteProps {
  children: ReactNode;
  className?: string;
  chevronColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  initialIndex?: number;
}

export const CarouselInfiniteContext =
  createContext<CarouselInfiniteContextProps>({
    itemLength: 0,
    setItemLength: () => {},
    carouselIndex: 1,
    setCarouselIndex: () => {},
    transition: true,
    setTransition: () => {},
    handlePrev: () => {},
    handleNext: () => {},
    isTransitioning: false,
    setIsTransitioning: () => {},
    itemWidth: 0,
    setItemWidth: () => {},
    containerWidth: 0,
    dragOffset: 0,
    setDragOffset: () => {},
    chevronColor: "#000000",
  });

const CarouselInfinite: FC<CarouselInfiniteProps> &
  CarouselInfiniteCompoundProps = (props) => {
  const { children, className, chevronColor, initialIndex = 1 } = props;
  const [carouselIndex, setCarouselIndex] = useState(initialIndex);
  const [itemLength, setItemLength] = useState(0);
  const [transition, setTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
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
  }, [children, carouselIndex]);

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

  useEffect(() => {
    if (carouselIndex === 0 || carouselIndex === itemLength + 1) {
      const targetIndex = carouselIndex === 0 ? itemLength : 1;
      setTimeout(() => {
        setTransition(false);
        setCarouselIndex(targetIndex);
        setIsTransitioning(false);
      }, 500);
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  }, [
    carouselIndex,
    itemLength,
    setCarouselIndex,
    setTransition,
    setIsTransitioning,
  ]);

  const contextValue = {
    itemLength,
    setItemLength,
    carouselIndex,
    setCarouselIndex,
    transition,
    setTransition,
    handlePrev,
    handleNext,
    isTransitioning,
    setIsTransitioning,
    itemWidth,
    setItemWidth,
    containerWidth,
    dragOffset,
    setDragOffset,
    chevronColor,
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
CarouselInfinite.Indicator = CarouselInfiniteIndicator;

export default CarouselInfinite;
