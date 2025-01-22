import { useContext, useMemo } from "react";
import { CarouselContext } from ".";
import { carouselIndicatorCls } from "@consts/className";

interface CarouselIndicatorProps {
  className?: string;
}

const CarouselIndicator = (props: CarouselIndicatorProps) => {
  const { itemLength } = useContext(CarouselContext);
  const { className } = props;

  const cls = useMemo(
    () =>
      className ? `${className} ${carouselIndicatorCls}` : carouselIndicatorCls,
    [className]
  );
  return (
    <div className={cls}>
      {Array.from({ length: itemLength }).map((_, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
};

export default CarouselIndicator;
