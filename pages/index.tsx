import Head from 'next/head';
import { GetServerSideProps } from 'next';
import NextRace from '../components/NextRace/NextRace';

type Props = {
  nextRaceData: NextRaceType;
  prevRaceData: ResultDataType;
};

const Home = ({ nextRaceData, prevRaceData }: Props) => {
  return (
    <>
      <Head>
        <title>F1 Info</title>
        <meta name='description' content='F1 Info' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/bolid.png' />
      </Head>
      <main>
        <NextRace nextRaceData={nextRaceData} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const nextRaceReq = await fetch(
    'https://ergast.com/api/f1/current/next.json'
  );
  // const nextRaceReq = await fetch('https://ergast.com/api/f1/2022/4.json');
  let nextRaceData;
  if (nextRaceReq.ok) {
    const nextRaceAPI: NextRaceAPI = await nextRaceReq.json();
    nextRaceData = {
      name: nextRaceAPI.MRData.RaceTable.Races[0].raceName,
      country: nextRaceAPI.MRData.RaceTable.Races[0].Circuit.Location.country,
      track: nextRaceAPI.MRData.RaceTable.Races[0].Circuit.circuitName,
      trackId: nextRaceAPI.MRData.RaceTable.Races[0].Circuit.circuitId,
      sessions: {
        fp1: {
          time: nextRaceAPI.MRData.RaceTable.Races[0].FirstPractice.time,
          date: nextRaceAPI.MRData.RaceTable.Races[0].FirstPractice.date,
        },
        fp2: {
          time: nextRaceAPI.MRData.RaceTable.Races[0].SecondPractice.time,
          date: nextRaceAPI.MRData.RaceTable.Races[0].SecondPractice.date,
        },
        fp3: {
          time: nextRaceAPI.MRData.RaceTable.Races[0].ThirdPractice?.time
            ? nextRaceAPI.MRData.RaceTable.Races[0].ThirdPractice?.time
            : null,
          date: nextRaceAPI.MRData.RaceTable.Races[0].ThirdPractice?.date
            ? nextRaceAPI.MRData.RaceTable.Races[0].ThirdPractice?.date
            : null,
        },
        qualifying: {
          time: nextRaceAPI.MRData.RaceTable.Races[0].Qualifying.time,
          date: nextRaceAPI.MRData.RaceTable.Races[0].Qualifying.date,
        },
        race: {
          time: nextRaceAPI.MRData.RaceTable.Races[0].time,
          date: nextRaceAPI.MRData.RaceTable.Races[0].date,
        },
        sprint: {
          time: nextRaceAPI.MRData.RaceTable.Races[0].Sprint?.time
            ? nextRaceAPI.MRData.RaceTable.Races[0].Sprint?.time
            : null,
          date: nextRaceAPI.MRData.RaceTable.Races[0].Sprint?.date
            ? nextRaceAPI.MRData.RaceTable.Races[0].Sprint?.date
            : null,
        },
      },
    };
  }

  const prevRaceReq = await fetch(
    'http://ergast.com/api/f1/current/last/results.json?limit=10'
  );
  let prevRaceData;
  if (prevRaceReq.ok) {
    const prevRaceAPI: ResultAPI = await prevRaceReq.json();
    prevRaceData = {
      name: prevRaceAPI.MRData.RaceTable.Races[0].raceName,
      country: prevRaceAPI.MRData.RaceTable.Races[0].Circuit.Location.country,
      results: prevRaceAPI.MRData.RaceTable.Races[0].Results,
    };
  }

  return { props: { nextRaceData, prevRaceData } };
};

export default Home;
