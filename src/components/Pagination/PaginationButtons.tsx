import { useContext } from "react";
import { paginationButtonsCls } from "../../consts/className";
import { PaginationContext } from ".";

const PaginationButtons = () => {
  const { pages, currentPage, setCurrentPage, onPageChange } =
    useContext(PaginationContext);

  const handleChangePageIndex = (index: number) => {
    setCurrentPage(index);
    onPageChange(index);
  };

  return (
    <div className={paginationButtonsCls}>
      {pages.map((pageIndex) => (
        <button
          key={`paginator-button-key-${pageIndex}`}
          onClick={() => handleChangePageIndex(pageIndex)}
          disabled={currentPage === pageIndex}
        >
          {pageIndex + 1}
        </button>
      ))}
    </div>
  );
};
export default PaginationButtons;
