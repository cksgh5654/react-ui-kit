import { useContext, useMemo } from "react";
import { calendarNavigatorCls } from "../../consts/className";
import { CalendarContext } from ".";

interface CalendarNavigatorProps {
  className?: string;
}

const CalendarNavigator = (props: CalendarNavigatorProps) => {
  const { date, setDate, onChange } = useContext(CalendarContext);
  const { className } = props;

  const handlePrev = () => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() - 1);
    setDate(currentDate);
    onChange(currentDate);
  };

  const handleNext = () => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() + 1);
    setDate(currentDate);
    onChange(currentDate);
  };

  const calendarCls = useMemo(
    () =>
      className ? `${className} ${calendarNavigatorCls}` : calendarNavigatorCls,
    [className]
  );

  return (
    <div className={calendarCls}>
      <button onClick={handlePrev}>&lt;</button>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default CalendarNavigator;
