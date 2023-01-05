import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  result: DriverType | ConstructorType;
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

      if (result.Constructor) {
        if (result.Constructor.constructorId in res) {
          setConstructorImg(res[result.Constructor.constructorId]);
        }
        return;
      }

      if ((result as DriverType).Constructors[0].constructorId in res) {
        setConstructorImg(
          res[(result as DriverType).Constructors[0].constructorId]
        );
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
          {result.Driver
            ? `${result.Driver.givenName} ${result.Driver.familyName}`
            : `${result.Constructor.name}`}
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
            result.FastestLap && result.FastestLap.rank === '1'
              ? 'text-purple-700'
              : 'text-white'
          } border-l border-l-gray-700 w-10 text-center`}
        >
          {result.points}
        </p>
      </div>
    </div>
  );
};

export default Result;
