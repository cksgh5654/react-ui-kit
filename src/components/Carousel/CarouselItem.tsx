import { FC, useContext } from "react";
import { CarouselContext } from ".";
import { carouselItemCls } from "../../consts/className";

interface CarouselItemProps {
  index: number;
}

const CarouselItem: FC<CarouselItemProps> = ({ index }) => {
  const { carouselIndex } = useContext(CarouselContext);

  return carouselIndex === index ? (
    <div className={carouselItemCls}>{carouselIndex}</div>
  ) : null;
};

export default CarouselItem;
