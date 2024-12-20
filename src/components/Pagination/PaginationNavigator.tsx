import { useContext } from "react";
import { paginationNavigatorCls } from "../../consts/className";
import { PaginationContext } from ".";

const PaginationNavigator = () => {
  const { currentPage, setCurrentPage, onPageChange, totalPageLength } =
    useContext(PaginationContext);

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

  return (
    <div className={paginationNavigatorCls}>
      <button onClick={handleClickPrev}>prev</button>
      <button onClick={handleClickNext}>next</button>
    </div>
  );
};
export default PaginationNavigator;
