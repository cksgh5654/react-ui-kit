import CalendarCurrent from "./CalendarCurrent";
import CalendarNavigator from "./CalendarNavigator";
import CalendarBody from "./CalendarBody";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { calendarBaseCls } from "../../consts/className";

interface CalendarCompoundProps {
  Current: typeof CalendarCurrent;
  Navigator: typeof CalendarNavigator;
  Body: typeof CalendarBody;
}

interface CalendarContextProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const CalendarContext = createContext<CalendarContextProps>({
  date: new Date(),
  setDate: () => {},
});

interface CalendarProps {
  children: ReactNode;
  className?: string;
  onChange: () => void;
  value: string;
}

const Calendar: FC<CalendarProps> & CalendarCompoundProps = (props) => {
  const [date, setDate] = useState<Date>(new Date());
  // const { children, className, onChange, value } = props;
  const { children, className } = props;

  const contextValue = { date, setDate };

  const calendarCls = useMemo(
    () => (className ? `${className} ${calendarBaseCls}` : calendarBaseCls),
    [className]
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={calendarCls}>{children}</div>
    </CalendarContext.Provider>
  );
};

Calendar.Current = CalendarCurrent;
Calendar.Navigator = CalendarNavigator;
Calendar.Body = CalendarBody;

export default Calendar;
