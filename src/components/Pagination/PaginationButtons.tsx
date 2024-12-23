import { useContext, useMemo } from "react";
import { paginationButtonsCls } from "../../consts/className";
import { PaginationContext } from ".";

interface PaginationButtons {
  className?: string;
}

const PaginationButtons = (props: PaginationButtons) => {
  const { pages, currentPage, setCurrentPage, onPageChange } =
    useContext(PaginationContext);

  const { className } = props;

  const handleChangePageIndex = (index: number) => {
    setCurrentPage(index);
    onPageChange(index);
  };

  const paginationCls = useMemo(
    () =>
      className ? `${className} ${paginationButtonsCls}` : paginationButtonsCls,
    []
  );

  return (
    <div className={paginationCls}>
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
