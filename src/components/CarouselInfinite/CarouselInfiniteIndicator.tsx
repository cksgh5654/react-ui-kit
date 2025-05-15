import { FC, useContext, useMemo } from "react";
import { CarouselInfiniteContext } from ".";
import { carouselInfiniteIndicatorCls } from "@consts/className";

interface CarouselInfiniteIndicatorProps {
  className?: string;
  styleType?: "dots" | "numbers" | "both";
  activeColor?: string;
  inactiveColor?: string;
  dotSize?: number;
}

const CarouselInfiniteIndicator: FC<CarouselInfiniteIndicatorProps> = ({
  className,
  styleType = "dots",
  activeColor = "#000000",
  inactiveColor = "#cccccc",
  dotSize = 10,
}) => {
  const {
    itemLength,
    carouselIndex,
    setCarouselIndex,
    setTransition,
    setIsTransitioning,
  } = useContext(CarouselInfiniteContext);

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselInfiniteIndicatorCls}`
        : carouselInfiniteIndicatorCls,
    [className]
  );

  const handleClick = (index: number) => {
    if (index !== carouselIndex) {
      setCarouselIndex(index);
      setTransition(true);
      setIsTransitioning(true);
    }
  };

  const renderDots = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {Array.from({ length: itemLength }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: "50%",
            backgroundColor:
              index + 1 === carouselIndex ? activeColor : inactiveColor,
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
            boxSizing: "border-box",
            outline: "none",
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

  const renderNumbers = () => (
    <div
      style={{
        color: activeColor,
      }}
    >
      {carouselIndex}/{itemLength}
    </div>
  );

  return (
    <div className={cls}>
      {(styleType === "dots" || styleType === "both") && renderDots()}
      {(styleType === "numbers" || styleType === "both") && renderNumbers()}
    </div>
  );
};

export default CarouselInfiniteIndicator;
