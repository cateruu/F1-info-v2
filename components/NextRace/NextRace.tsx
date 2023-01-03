import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCountryName } from '../../utils/getCountryName';
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
              src={`https://countryflagsapi.com/png/${getCountryName(
                nextRaceData.country
              )}`}
              alt={nextRaceData.country}
              width={20}
              height={15}
              className='h-4'
            />
          </span>
        </h3>
        <h4 className='text-gray-500 mb-6'>{nextRaceData.track}</h4>
        <Sessions sessions={nextRaceData.sessions} />
      </div>
      {loading && (
        <svg
          id='svg2'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 582.69443 182.52093'
          version='1.1'
          fill='none'
          className='animate-pulse flex-grow stroke-gray-500'
          data-testid='track-loader'
        >
          <path
            id='path4'
            strokeLinejoin='round'
            d='m560.41 40.295c-20.018-8.5906-41.406-13.904-62.007-21.09-18.126-7.8881-40.735 12.076-33.534 30.966 2.3505 16.442 20.999 18.385 33.065 24.738 6.1492 13.672 10.935 28.162 16.195 42.261 2.3859 4.9366-3.0391 12.455-8.3552 8.9062-59.54-35.146-118.45-71.357-178-106.48-16.838-9.0143-39.62-6.536-51.298 9.7052-16.243 22.891-32.566 45.843-47.369 69.696-8.074 11.823 3.1024 33.213-12.794 40.237-29.51 0.46204-61.831 4.254-87.982-12.578-17.01-11.455-34.26-22.594-50.927-34.537-8.9476-6.0287-2.2628-22.763 8.5379-21.555 26.166-0.84475 52.38 0.0272 78.561-0.3787 18.353-1.9193 38.009-13.378 40.726-33.185 5.4824-18.519-13.353-35.71-31.601-31.873-47.18 2.6975-98.162-9.3126-141.36 15.38l-1.5768 0.98827c-20.369 14.774-33.822 43.209-21.733 67.261l5.3421 8.5236c14.465 18.598 40.396 18.998 58.279 32.597 8.6385 8.0399 6.2489 20.348 7.1311 30.794 2.6542 8.4152 10.169 16.865 19.706 16.528 144.76-0.88 289.52-0.15 434.28 0.88 6.1801 0.25726 12.315-0.59035 18.352-1.8243l13.245-8.3012c16.149-16.187 12.808-40.046 12.495-60.845-1.1932-9.8501-17.247-3.6011-18.1-13.286-0.20453-16.878 5.1156-33.642 2.5896-50.552l-1.8637-2.9736z'
            strokeLinecap='round'
            strokeWidth='8.8001'
          />
        </svg>
      )}
      {trackImg && (
        <a
          href={trackImg.image}
          target='_blank'
          rel='noreferrer'
          className='relative flex-grow hidden lg:block ml-2'
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
        View Track Image
      </a>
    </section>
  );
};

export default NextRace;
