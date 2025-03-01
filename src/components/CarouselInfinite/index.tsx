import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  FC,
  useMemo,
} from "react";
import CarouselItemContainer from "./CarouselInfiniteItemContainer";
import CarouselItemList from "./CarouselInfiniteItemList";
import CarouselItem from "./CarouselInfiniteItem";
import CarouselNavigator from "./CarouselInfiniteNavigator";
import { carouselInfiniteBaseCls } from "@consts/className";

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
  });

const CarouselInfinite: FC<CarouselInfiniteProps> &
  CarouselInfiniteCompoundProps = (props) => {
  const [carouselIndex, setCarouselIndex] = useState<number>(1);
  const [itemLength, setItemLength] = useState<number>(0);
  const { children, className } = props;
  const [transition, setTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
  };

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % extendeditemLength);
    setTransition(true);
    setIsTransitioning(true);
  };

  const contextValue = {
    itemLength,
    transition,
    setTransition,
    setItemLength,
    carouselIndex,
    setCarouselIndex,
    displayIndex,
    handlePrev,
    handleNext,
    isTransitioning,
    setIsTransitioning,
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
      <div className={cls} style={{ overflow: "hidden" }}>
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
