import { ReactNode, useContext, useMemo } from "react";
import { CarouselInfiniteContext } from ".";
import { carouselInfiniteNavigatorCls } from "@consts/className";
import ChevronIcon from "@ui/icon/ChevronIcon";

interface CarouselInfiniteNavigatorProps {
  className?: string;
  children?: (
    prev: () => void,
    next: () => void,
    isTransitioning: boolean
  ) => ReactNode;
}

const CarouselInfiniteNavigator = (props: CarouselInfiniteNavigatorProps) => {
  const { className, children } = props;
  const { handlePrev, handleNext, isTransitioning, chevronColor } = useContext(
    CarouselInfiniteContext
  );

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselInfiniteNavigatorCls}`
        : carouselInfiniteNavigatorCls,
    [className]
  );

  return (
    <div className={cls}>
      {children && typeof children === "function" ? (
        children(handlePrev, handleNext, isTransitioning)
      ) : (
        <>
          <button onClick={handlePrev} disabled={isTransitioning}>
            <ChevronIcon color={chevronColor} style={{ width: "32px" }} />
          </button>
          <button onClick={handleNext} disabled={isTransitioning}>
            <ChevronIcon
              color={chevronColor}
              style={{ rotate: "180deg", width: "32px" }}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default CarouselInfiniteNavigator;
