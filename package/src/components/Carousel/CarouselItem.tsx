import { FC, ReactNode, useContext, useMemo } from "react";
import { CarouselContext } from ".";
import { carouselItemCls } from "@consts/className";

interface CarouselItemProps {
  index: number;
  className?: string;
  children?: ReactNode;
}

const CarouselItem: FC<CarouselItemProps> = (props) => {
  const { carouselIndex } = useContext(CarouselContext);
  const { className, index, children } = props;

  const cls = useMemo(
    () => (className ? `${className} ${carouselItemCls}` : carouselItemCls),
    [className]
  );

  return carouselIndex === index ? <div className={cls}>{children}</div> : null;
};

export default CarouselItem;
