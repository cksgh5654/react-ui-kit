import { ReactNode } from "react";
import { carouselItemListCls } from "../../consts/className";

const CarouselItemList = ({ children }: { children: ReactNode }) => {
  return <div className={carouselItemListCls}>{children}</div>;
};

export default CarouselItemList;
