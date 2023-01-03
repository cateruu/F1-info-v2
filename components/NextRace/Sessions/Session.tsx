import { getLocalTime } from '../../../utils/getLocalTime';
import { getMonth } from '../../../utils/getMonth';

type Props = {
  name: string;
  date: string;
  time: string;
};

const Session = ({ name, date, time }: Props) => {
  return (
    <div className='flex items-center mb-2'>
      <div className='flex flex-col items-center justify-center pr-4 border-r border-r-gray-700'>
        <p className='text-white text-2xl'>{date.split('-')[2]}</p>
        <p className='text-gray-500 -mt-2 text-lg'>{getMonth(date)}</p>
      </div>
      <div className='flex flex-col  justify-center pl-4'>
        <p className='text-white text-2xl'>{name}</p>
        <p className='text-gray-500 -mt-2 text-lg'>
          {getLocalTime(date, time)}
        </p>
      </div>
    </div>
  );
};

export default Session;
