import { carouselItemListCls } from "@consts/className";
import { Children, ReactNode, useContext, useEffect, useMemo } from "react";
import { CarouselContext } from ".";

interface CarouselItemListProps {
  children: ReactNode;
  className?: string;
}

const CarouselItemList = (props: CarouselItemListProps) => {
  const { children, className } = props;
  const { setItemLength } = useContext(CarouselContext);

  useEffect(() => {
    const totalItems = Children.count(children);
    setItemLength(totalItems);
  }, [children, setItemLength]);

  const cls = useMemo(
    () =>
      className ? `${className} ${carouselItemListCls}` : carouselItemListCls,
    [className]
  );

  return <div className={cls}>{children}</div>;
};

export default CarouselItemList;
