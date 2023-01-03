import { useEffect, useState } from 'react';
import { getTimeToRace } from '../../../utils/getTimeToRace';

type Props = {
  time: string;
  date: string;
};

const Timer = ({ date, time }: Props) => {
  const [timeToRace, setTimeToRace] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(
      () => setTimeToRace(getTimeToRace(date, time)),
      1000
    );

    return () => clearTimeout(timer);
  }, [date, time, timeToRace]);

  return (
    <time
      className={`${
        timeToRace === 'Live' ? 'text-red-600' : 'text-gray-500'
      } w-20`}
    >
      {timeToRace}
    </time>
  );
};

export default Timer;
