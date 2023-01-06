import Image from 'next/image';
import Link from 'next/link';
import { getCountryName } from '../../utils/getCountryName';
import Results from './Results/Results';

type Props = {
  previousRaceData: ResultDataType;
};

const PreviousRace = ({ previousRaceData }: Props) => {
  return (
    <section className='flex flex-col mb-12'>
      <h2 className='text-4xl text-white font-medium mb-2 mr-4 mt-14'>
        Previous Race
      </h2>
      <h3 className='text-lg text-yellow-200 flex items-center mb-4'>
        <span className='mr-2'>{previousRaceData.name}</span>
        <span className='rounded-sm overflow-hidden'>
          <Image
            src={`https://countryflagsapi.com/png/${getCountryName(
              previousRaceData.country
            )}`}
            alt={previousRaceData.country}
            width={20}
            height={15}
            className='h-4'
          />
        </span>
      </h3>
      <Results results={previousRaceData.results as ConstructorType[]} />
      <Link
        href='/results'
        className='w-full py-3 text-center bg-red-600 block rounded-md text-white mt-2 font-medium'
      >
        Full Results
      </Link>
    </section>
  );
};

export default PreviousRace;
