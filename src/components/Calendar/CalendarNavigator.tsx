import { ReactNode, useContext, useMemo } from "react";
import { CalendarContext } from ".";
import { calendarNavigatorCls } from "@consts/className";
import ChevronIcon from "@ui/icon/ChevronIcon";

interface CalendarNavigatorProps {
  className?: string;
  children?: ReactNode;
}

const CalendarNavigator = (props: CalendarNavigatorProps) => {
  const { date, setDate, onChange, chevronColor } = useContext(CalendarContext);
  const { className, children } = props;

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

  const cls = useMemo(
    () =>
      className ? `${className} ${calendarNavigatorCls}` : calendarNavigatorCls,
    [className]
  );

  return (
    <div className={cls}>
      <button onClick={handlePrev}>
        <ChevronIcon color={chevronColor} width={"32px"} />
      </button>
      {children}
      <button onClick={handleNext}>
        <ChevronIcon
          color={chevronColor}
          style={{ rotate: "180deg", width: "32px" }}
        />
      </button>
    </div>
  );
};

export default CalendarNavigator;
