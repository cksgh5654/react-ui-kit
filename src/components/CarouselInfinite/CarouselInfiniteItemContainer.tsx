import { carouselInfiniteItemContainerCls } from "@consts/className";
import { ReactNode, useContext, useMemo } from "react";
import { CarouselInfiniteContext } from ".";

interface CarouselInfiniteItemContainerProps {
  children: ReactNode;
  className?: string;
}

const CarouselInfiniteItemContainer = (
  props: CarouselInfiniteItemContainerProps
) => {
  const { children, className } = props;
  const { carouselIndex, transition, itemWidth, containerWidth, dragOffset } =
    useContext(CarouselInfiniteContext);

  const offset = useMemo(() => {
    return (containerWidth - itemWidth) / 2;
  }, [containerWidth, itemWidth, carouselIndex]);

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselInfiniteItemContainerCls}`
        : carouselInfiniteItemContainerCls,
    [className]
  );

  return (
    <div
      className={cls}
      style={{
        transition: `${transition ? "transform 0.5s ease-in-out" : "none"}`,
        transform: `translateX(calc(-${
          carouselIndex * itemWidth
        }px + ${offset}px + ${dragOffset}px))`,
      }}
    >
      {children}
    </div>
  );
};

export default CarouselInfiniteItemContainer;
