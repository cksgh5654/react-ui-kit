import { FC, useMemo } from "react";
import { datePickerBaseCls } from "../../consts/className";
import Popover from "../Popover";
import Calendar from "../Calendar";

interface DatePickerProps {
  className?: string;
  date: Date;
  onChangeDate: (date: Date) => void;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const { className, date, onChangeDate } = props;

  const datePickerCls = useMemo(
    () => (className ? `${className} ${datePickerBaseCls}` : datePickerBaseCls),
    [className]
  );

  return (
    <Popover className={datePickerCls} position="bottom-left">
      <Calendar onChange={onChangeDate} value={date}>
        <Popover.Trigger>
          <Calendar.Current />
        </Popover.Trigger>
        <Popover.Content>
          <Calendar.Navigator />
          <Calendar.Body />
        </Popover.Content>
      </Calendar>
    </Popover>
  );
};
export default DatePicker;
