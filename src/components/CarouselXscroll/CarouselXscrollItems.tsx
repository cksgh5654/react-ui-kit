import { FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { CarouselXscrollContext } from ".";
import { carouselXscrollItemsCls } from "@consts/className";

interface CarouselXscrollItemsProps {
  children: ReactNode;
  className?: string;
}

const CarouselXscrollItems: FC<CarouselXscrollItemsProps> = (props) => {
  const { className, children } = props;
  const { baseRect, isDragging, itemListRef } = useContext(
    CarouselXscrollContext
  );
  const [itemListRect, setItemListRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const rect = itemListRef.current?.getBoundingClientRect();
      if (rect) {
        setItemListRect(rect);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [itemListRef]);

  console.log("itemListRect", itemListRect?.left);
  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselXscrollItemsCls}`
        : carouselXscrollItemsCls,
    [className]
  );

  const translateX = useMemo(() => {
    if (baseRect?.left && itemListRect?.left) {
      return baseRect.left - itemListRect.left;
    }
    return 0;
  }, [baseRect, itemListRect]);

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        display: "flex",
        overflowX: "visible",
        pointerEvents: isDragging ? "none" : "auto",
      }}
      className={cls}
    >
      {children}
    </div>
  );
};

export default CarouselXscrollItems;
