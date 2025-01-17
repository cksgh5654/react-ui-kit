import { useContext, useMemo } from "react";
import { calendarCurrentCls } from "../../consts/className";
import { CalendarContext } from ".";

const arrDayStr = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarCurrentProps {
  className?: string;
}

const CalendarCurrent = (props: CalendarCurrentProps) => {
  const { date } = useContext(CalendarContext);
  const { className } = props;

  const currentDate =
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일 (" +
    arrDayStr[date.getDay()] +
    ")";

  const calendarCls = useMemo(
    () =>
      className ? `${className} ${calendarCurrentCls}` : calendarCurrentCls,
    [className]
  );

  return <div className={calendarCls}>{currentDate}</div>;
};

export default CalendarCurrent;
