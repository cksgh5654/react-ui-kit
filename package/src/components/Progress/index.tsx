import { FC, useEffect, useMemo, useState } from "react";
import "./Progress.css";
import { progressBaseCls } from "@consts/className";

interface ProgressProps {
  className?: string;
  stop: boolean;
}

const Progress: FC<ProgressProps> = (props) => {
  const { stop, className } = props;
  const [value, setValue] = useState(0);

  let raf: number;

  const performAnimation = () => {
    setValue((prevValue) => {
      const nextValue = prevValue + (stop ? 0.1 : 0.001);
      if (nextValue >= 1) {
        cancelAnimationFrame(raf);
      }
      return nextValue;
    });
    raf = requestAnimationFrame(performAnimation);
  };

  useEffect(() => {
    raf = requestAnimationFrame(performAnimation);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [stop]);

  const cls = useMemo(
    () => (className ? `${className} ${progressBaseCls}` : progressBaseCls),
    [className]
  );
  return (
    <>
      <progress
        value={value}
        className={cls}
        style={{ display: value >= 1 ? "none" : "block" }}
      />
    </>
  );
};

export default Progress;
