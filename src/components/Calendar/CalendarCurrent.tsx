import { useContext } from "react";
import { calendarCurrentCls } from "../../consts/className";
import { CalendarContext } from ".";

const arrDayStr = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarCurrent = () => {
  const { date } = useContext(CalendarContext);

  const currentDate =
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일 (" +
    arrDayStr[date.getDay()] +
    ")";

  return <div className={calendarCurrentCls}>{currentDate}</div>;
};

export default CalendarCurrent;
