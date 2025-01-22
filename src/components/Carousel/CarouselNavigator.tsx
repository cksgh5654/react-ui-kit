import { useContext, useMemo } from "react";
import { CarouselContext } from ".";
import { carouselNavigatorCls } from "@consts/className";

interface CarouselNavigatorProps {
  className?: string;
}

const CarouselNavigator = (props: CarouselNavigatorProps) => {
  const { className } = props;
  const { itemLength, carouselIndex, setCarouselIndex } =
    useContext(CarouselContext);

  const handlePrev = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    } else {
      setCarouselIndex(itemLength - 1);
    }
  };

  const handleNext = () => {
    if (carouselIndex < itemLength - 1) {
      setCarouselIndex(carouselIndex + 1);
    } else {
      setCarouselIndex(0);
    }
  };

  const cls = useMemo(
    () =>
      className ? `${className} ${carouselNavigatorCls}` : carouselNavigatorCls,
    [className]
  );

  return (
    <div className={cls}>
      <button onClick={handlePrev}>&lt;</button>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default CarouselNavigator;
