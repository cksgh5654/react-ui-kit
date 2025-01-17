import { FC, useContext, useMemo } from "react";
import { CarouselContext } from ".";
import { carouselItemCls } from "../../consts/className";

interface CarouselItemProps {
  index: number;
  className?: string;
}

const CarouselItem: FC<CarouselItemProps> = (props) => {
  const { carouselIndex } = useContext(CarouselContext);
  const { className, index } = props;

  const carouselCls = useMemo(
    () => (className ? `${className} ${carouselItemCls}` : carouselItemCls),
    []
  );

  return carouselIndex === index ? (
    <div className={carouselCls}>{carouselIndex}</div>
  ) : null;
};

export default CarouselItem;
