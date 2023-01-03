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
      } w-20 relative`}
    >
      {timeToRace}
      <div className='absolute w-5 h-5 rounded-full bg-red-600 animate-ping top-0.5 origin-center left-1'></div>
    </time>
  );
};

export default Timer;
