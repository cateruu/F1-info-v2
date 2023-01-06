import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Podium from '../components/Podium/Podium';
import Results from '../components/PreviousRace/Results/Results';
import { getCountryName } from '../utils/getCountryName';

type Props = {
  resultsData: ResultDataType;
};

const ResultsPage = ({ resultsData }: Props) => {
  return (
    <>
      <Head>
        <title>F1 Info - Results</title>
        <meta name='description' content='F1 Info' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/bolid.png' />
      </Head>
      <main className='mb-12'>
        <h2 className='text-white text-4xl'>Results</h2>
        <div className='flex items-center mb-6'>
          <h3 className='text-lg text-yellow-200 mr-2'>{resultsData.name}</h3>
          <span className='rounded-sm overflow-hidden'>
            <Image
              src={`https://countryflagsapi.com/png/${getCountryName(
                resultsData.country
              )}`}
              alt={resultsData.country}
              width={20}
              height={15}
              className='h-4 w-auto'
            />
          </span>
        </div>
        <Podium podium={resultsData.results.slice(0, 3) as ConstructorType[]} />
        <Results results={resultsData.results.slice(3) as ConstructorType[]} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const resultsReq = await fetch(
    'http://ergast.com/api/f1/current/last/results.json'
  );
  let resultsData;
  if (resultsReq.ok) {
    const resultsAPI: ResultAPI = await resultsReq.json();
    resultsData = {
      name: resultsAPI.MRData.RaceTable.Races[0].raceName,
      country: resultsAPI.MRData.RaceTable.Races[0].Circuit.Location.country,
      results: resultsAPI.MRData.RaceTable.Races[0].Results,
    };
  }

  return { props: { resultsData } };
};

export default ResultsPage;
