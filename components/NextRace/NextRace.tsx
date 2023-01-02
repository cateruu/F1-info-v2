import Image from 'next/image';
import Timer from './Timer/Timer';

type Props = {
  nextRaceData: NextRaceType;
};

const NextRace = ({ nextRaceData }: Props) => {
  return (
    <section>
      <div className='flex items-center'>
        <h2 className='text-4xl text-white font-medium mb-2 mr-4'>
          Next Race{' '}
        </h2>
        <Timer
          date={nextRaceData.sessions.race.date}
          time={nextRaceData.sessions.race.time}
        />
      </div>
      <h3 className='text-lg text-yellow-200 flex items-center'>
        <span className='mr-2'>{nextRaceData.name}</span>
        <span className='rounded-sm overflow-hidden'>
          <Image
            src={`https://countryflagsapi.com/png/${nextRaceData.country}`}
            alt={nextRaceData.country}
            width={20}
            height={15}
          />
        </span>
      </h3>
      <h4 className='text-gray-500'>{nextRaceData.track}</h4>
    </section>
  );
};

export default NextRace;
