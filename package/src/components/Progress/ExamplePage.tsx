import { useEffect, useState } from "react";
import Progress from ".";

const ExamplePage = () => {
  const [stop, setStop] = useState<boolean>(false);
  const getUserData = async () => {
    const sleep = async (time: number): Promise<void> =>
      await new Promise((resolve) => setTimeout(() => resolve(), time));
    await sleep(3000);
    setStop(true);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return <Progress stop={stop} />;
};
export default ExamplePage;
