import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  result: {
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
  position?: string;
};

type Constructor = {
  name: string;
  image: string;
};

const Result = ({ result, position }: Props) => {
  const [constructorImg, setConstructorImg] = useState<Constructor>();

  useEffect(() => {
    const fetchConstructor = async () => {
      const req = await fetch('/api/constructors');
      const res = await req.json();

      if (result.Constructor.constructorId in res) {
        setConstructorImg(res[result.Constructor.constructorId]);
      }
    };

    fetchConstructor().catch((err) => console.error(err));
  }, [result]);

  let podiumBg;
  if (position) {
    switch (position) {
      case '1':
        podiumBg = 'bg-yellow-600';
        break;
      case '2':
        podiumBg = 'bg-gray-500';
        break;
      case '3':
        podiumBg = 'bg-orange-900';
        break;
    }
  }

  return (
    <div
      className={`flex justify-between py-3 border border-gray-700 rounded-md mb-2  ${
        position && podiumBg
      }`}
    >
      <div className='flex'>
        <p className='text-white border-r border-r-gray-700 w-10 text-center'>
          {result.position}
        </p>
        <p className='ml-3 text-white'>
          {result.Driver.givenName} {result.Driver.familyName}
        </p>
      </div>
      <div className='flex'>
        {constructorImg && (
          <div className='relative w-8 mr-3'>
            <Image
              src={constructorImg?.image}
              alt={constructorImg?.name}
              fill
              className='object-contain'
            />
          </div>
        )}
        <p
          className={`${
            result.FastestLap.rank === '1' ? 'text-purple-700' : 'text-white'
          } border-l border-l-gray-700 w-10 text-center`}
        >
          {result.points}
        </p>
      </div>
    </div>
  );
};

export default Result;
