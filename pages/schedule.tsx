import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getCountryName } from '../utils/getCountryName';

type Props = {
  scheduleData: ScheduleData[];
  nextRaceData: {
    round: string;
  };
};

const SchedulePage = ({ scheduleData, nextRaceData }: Props) => {
  return (
    <>
      <Head>
        <title>F1 Info - Schedule</title>
        <meta name='description' content='F1 Info' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/bolid.png' />
      </Head>
      <main>
        <h2 className='text-white text-4xl'>Schedule</h2>
        <section className='flex flex-wrap gap-2 justify-center mt-6'>
          {scheduleData.map((race) => (
            <a
              key={race.round}
              href={race.Circuit.url}
              target='_blank'
              rel='noreferrer'
              className={`${
                race.round === nextRaceData.round
                  ? 'bg-blue-900'
                  : 'bg-gray-700'
              } flex flex-col py-8 text-center rounded-lg items-center text-white w-60 h-60`}
            >
              <Image
                src={`https://countryflagsapi.com/png/${getCountryName(
                  race.Circuit.Location.country
                )}`}
                alt={race.Circuit.Location.country}
                width={20}
                height={15}
                className='h-4 w-auto rounded-sm'
              />
              <p className='text-lg mt-4'>{race.raceName}</p>
              <p className='text-gray-400 text-sm'>
                {race.Circuit.circuitName}
              </p>
              <p className='mt-auto'>{race.date}</p>
            </a>
          ))}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const scheduleReq = await fetch('http://ergast.com/api/f1/current.json');

  let scheduleData;
  if (scheduleReq.ok) {
    const scheduleAPI: ScheduleAPI = await scheduleReq.json();
    scheduleData = scheduleAPI.MRData.RaceTable.Races;
  }

  const nextRaceReq = await fetch(
    'https://ergast.com/api/f1/current/next.json'
  );
  let nextRaceData;
  if (nextRaceReq.ok) {
    const nextRaceAPI: NextRaceAPI = await nextRaceReq.json();
    nextRaceData = {
      round: nextRaceAPI.MRData.RaceTable.round,
    };
  }

  return {
    props: {
      scheduleData,
      nextRaceData,
    },
  };
};

export default SchedulePage;
