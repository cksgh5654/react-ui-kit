import { FC, ReactNode, useContext, useMemo, useState } from "react";
import { carouselInfiniteItemCls } from "@consts/className";
import { CarouselInfiniteContext } from ".";

interface CarouselInfiniteItemProps {
  index: number;
  className?: string;
  children: (carouselIndex: number) => ReactNode;
}

const CarouselInfiniteItem: FC<CarouselInfiniteItemProps> = (props) => {
  const { className, children } = props;
  const [startX, setStartX] = useState<number | null>(null);
  const { handlePrev, handleNext, carouselIndex, setDragOffset } = useContext(
    CarouselInfiniteContext
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX !== null) {
      const endX = e.changedTouches[0].clientX;
      const distance = startX - endX;
      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      setStartX(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX === null) return;
    const currentX = e.clientX;
    const offset = currentX - startX;
    setDragOffset(offset);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (startX !== null) {
      const endX = e.clientX;
      const distance = startX - endX;
      setDragOffset(0);
      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      setStartX(null);
    }
  };

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselInfiniteItemCls}`
        : carouselInfiniteItemCls,
    [className]
  );

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cls}
      style={{ flexShrink: "0" }}
    >
      {children(carouselIndex)}
    </div>
  );
};

export default CarouselInfiniteItem;
