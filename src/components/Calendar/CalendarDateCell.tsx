import { useContext } from "react";
import { CalendarContext } from ".";
import { calendarDateCellCls } from "@consts/className";

interface CalendarDateCellProps {
  children: number;
  day: Date;
}

const CalendarDateCell = (props: CalendarDateCellProps) => {
  const { children, day } = props;
  const { date, setDate, onChange } = useContext(CalendarContext);

  const isCurrentDate =
    day.getFullYear() === date.getFullYear() &&
    day.getMonth() === date.getMonth() &&
    day.getDate() === date.getDate();

  const handleClick = (day: Date) => {
    setDate(day);
    onChange(day);
  };

  return (
    <div
      className={calendarDateCellCls}
      style={{ width: "100%" }}
      id={isCurrentDate ? "current-date" : undefined}
      onClick={() => handleClick(day)}
    >
      {children}
    </div>
  );
};

export default CalendarDateCell;
