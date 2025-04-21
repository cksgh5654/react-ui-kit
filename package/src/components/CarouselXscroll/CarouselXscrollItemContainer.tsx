import { ReactNode, useContext, useMemo, useState, useEffect } from "react";
import { CarouselXscrollContext } from ".";
import { carouselXscrollItemContainerCls } from "@consts/className";

interface CarouselXscrollItemContainerProps {
  children: ReactNode;
  className?: string;
}

const CarouselXscrollItemContainer = (
  props: CarouselXscrollItemContainerProps
) => {
  const { children, className } = props;
  const { itemListRef, setScrollPosition } = useContext(CarouselXscrollContext);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    if (itemListRef.current) {
      setScrollPosition(itemListRef.current.scrollLeft);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (itemListRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - itemListRef.current.offsetLeft);
      setScrollLeft(itemListRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !itemListRef.current) return;
    e.preventDefault();
    const x = e.pageX - itemListRef.current.offsetLeft;
    const walk = x - startX;
    itemListRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (itemListRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - itemListRef.current.offsetLeft);
      setScrollLeft(itemListRef.current.scrollLeft);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !itemListRef.current) return;
    const x = e.touches[0].pageX - itemListRef.current.offsetLeft;
    const walk = x - startX;
    itemListRef.current.scrollLeft = scrollLeft - walk;
  };

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselXscrollItemContainerCls}`
        : carouselXscrollItemContainerCls,
    [className]
  );

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      style={{
        overflow: "scroll",
        display: "flex",
        alignItems: "center",
        scrollbarWidth: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      ref={itemListRef as React.RefObject<HTMLDivElement>}
      className={cls}
    >
      {children}
    </div>
  );
};

export default CarouselXscrollItemContainer;
