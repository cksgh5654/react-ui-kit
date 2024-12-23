import { useContext, useMemo } from "react";
import { paginationNavigatorCls } from "../../consts/className";
import { PaginationContext } from ".";

interface PaginationNavigatorProps {
  className?: string;
}

const PaginationNavigator = (props: PaginationNavigatorProps) => {
  const { currentPage, setCurrentPage, onPageChange, totalPageLength } =
    useContext(PaginationContext);

  const { className } = props;

  const handleClickPrev = () => {
    if (currentPage === 0) return;
    const changedPageIndex = currentPage - 1;
    setCurrentPage(changedPageIndex);
    onPageChange(changedPageIndex);
  };

  const handleClickNext = () => {
    const changedPageIndex = currentPage + 1;
    console.log(totalPageLength, changedPageIndex - 1);
    if (totalPageLength <= changedPageIndex) return;
    setCurrentPage(changedPageIndex);
    onPageChange(changedPageIndex);
  };

  const paginationCls = useMemo(
    () =>
      className
        ? `${className} ${paginationNavigatorCls}`
        : paginationNavigatorCls,
    []
  );

  return (
    <div className={paginationCls}>
      <button onClick={handleClickPrev}>prev</button>
      <button onClick={handleClickNext}>next</button>
    </div>
  );
};
export default PaginationNavigator;
