import { useContext } from "react";
import { CarouselContext } from ".";
import { carouselNavigatorCls } from "../../consts/className";

const CarouselNavigator = () => {
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

  return (
    <div className={carouselNavigatorCls}>
      <button onClick={handlePrev}>&lt;</button>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default CarouselNavigator;
