import { ReactNode, useMemo } from "react";
import { carouselItemListCls } from "../../consts/className";

interface CarouselItemListProps {
  children: ReactNode;
  className?: string;
}

const CarouselItemList = (props: CarouselItemListProps) => {
  const { children, className } = props;

  const carouselCls = useMemo(
    () =>
      className ? `${className} ${carouselItemListCls}` : carouselItemListCls,
    []
  );

  return <div className={carouselCls}>{children}</div>;
};

export default CarouselItemList;
