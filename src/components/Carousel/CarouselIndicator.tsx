import { useContext } from "react";
import { CarouselContext } from ".";
import { carouselIndicatorCls } from "../../consts/className";

const CarouselIndicator = () => {
  const { itemLength } = useContext(CarouselContext);
  return (
    <div className={carouselIndicatorCls}>
      {Array.from({ length: itemLength }).map((_, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
};

export default CarouselIndicator;
