import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  podium: {
    number: string;
    position: string;
    points: string;
    Driver: {
      givenName: string;
      familyName: string;
      driverId: string;
    };
    Constructor: {
      constructorId: string;
    };
    FastestLap: {
      rank: string;
    };
  };
};

type FetchType = {
  name: string;
  image: string;
};

const Position = ({ podium }: Props) => {
  const [driverImg, setDriverImg] = useState<FetchType>();
  const [constructorImg, setConstructorImg] = useState<FetchType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDriver = async () => {
      setLoading(true);
      const req = await fetch('/api/drivers');
      const res = await req.json();

      if (podium.Driver.driverId in res) {
        setDriverImg(res[podium.Driver.driverId]);
      }
      setLoading(false);
    };

    const fetchConstructor = async () => {
      setLoading(true);
      const req = await fetch('/api/constructors');
      const res = await req.json();

      if (podium.Constructor.constructorId in res) {
        setConstructorImg(res[podium.Constructor.constructorId]);
      }
      setLoading(false);
    };

    fetchDriver().catch((err) => console.error(err));
    fetchConstructor().catch((err) => console.error(err));
  }, [podium]);

  let podiumBg;
  let margin;
  if (podium.position) {
    switch (podium.position) {
      case '1':
        podiumBg = 'bg-yellow-600';
        margin = 'mt-0';
        break;
      case '2':
        podiumBg = 'bg-gray-500';
        margin = 'mt-4';
        break;
      case '3':
        podiumBg = 'bg-orange-900';
        margin = 'mt-8';
        break;
    }
  }

  return (
    <div className={`${margin} flex flex-col items-center`}>
      <div className='relative w-full h-40'>
        {loading && (
          <Image
            src='/unknown.png'
            alt='Loading driver image...'
            fill
            className='object-contain'
          />
        )}
        {constructorImg && (
          <Image
            src={constructorImg.image}
            alt={constructorImg.name}
            fill
            className='object-contain blur-sm'
          />
        )}
        {driverImg && (
          <Image
            src={driverImg.image}
            alt={driverImg.name}
            fill
            className='object-contain'
          />
        )}
      </div>
      <div
        className={`${podiumBg} flex flex-col items-center w-64 py-2 rounded-md text-white`}
      >
        <p className='font-semibold text-2xl mb-2 '>{podium.position}</p>
        <p className='text-xl'>
          {podium.Driver.givenName} {podium.Driver.familyName}
        </p>
        <p>
          Points:{' '}
          <span
            className={`${podium.FastestLap.rank === '1' && 'text-purple-700'}`}
          >
            {podium.points}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Position;
