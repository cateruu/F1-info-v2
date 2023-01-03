import Image from 'next/image';
import { useEffect, useState } from 'react';
import Sessions from './Sessions/Sessions';
import Timer from './Timer/Timer';

type Props = {
  nextRaceData: NextRaceType;
};

type TrackImg = {
  name: string;
  image: string;
};

const NextRace = ({ nextRaceData }: Props) => {
  const [trackImg, setTrackImg] = useState<TrackImg>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrack = async () => {
      setLoading(true);
      const req = await fetch('/api/tracks');
      const res = await req.json();

      if (nextRaceData.trackId in res) {
        setTrackImg(res[nextRaceData.trackId]);
      }
      setLoading(false);
    };

    fetchTrack().catch((err) => console.error(err));
  }, [nextRaceData]);

  return (
    <section className='flex flex-col lg:flex-row'>
      <div>
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
        <h4 className='text-gray-500 mb-6'>{nextRaceData.track}</h4>
        <Sessions sessions={nextRaceData.sessions} />
      </div>
      {trackImg && (
        <a
          href={trackImg.image}
          target='_blank'
          rel='noreferrer'
          className='relative flex-grow hidden lg:block'
        >
          <Image
            src={trackImg.image}
            alt={trackImg.name}
            fill
            sizes='100vw'
            className='object-contain'
          />
        </a>
      )}
      <a
        href={trackImg?.image}
        target='_blank'
        rel='noreferrer'
        className='w-full bg-red-600 text-white rounded-md grid place-items-center font-medium p-3 mt-4 lg:hidden'
      >
        Check Track Image
      </a>
    </section>
  );
};

export default NextRace;
