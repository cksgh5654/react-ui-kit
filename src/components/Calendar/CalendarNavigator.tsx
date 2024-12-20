import { useContext } from "react";
import { calendarNavigatorCls } from "../../consts/className";
import { CalendarContext } from ".";

const CalendarNavigator = () => {
  const { date, setDate } = useContext(CalendarContext);

  const handlePrev = () => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() - 1);
    setDate(currentDate);
  };

  const handleNext = () => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() + 1);
    setDate(currentDate);
  };

  return (
    <div className={calendarNavigatorCls}>
      <button onClick={handlePrev}>&lt;</button>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default CalendarNavigator;
