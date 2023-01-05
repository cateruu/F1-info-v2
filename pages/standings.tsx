import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import Result from '../components/PreviousRace/Results/Result';

type Props = {
  driversData: { result: DriverType[] };
  constructorsData: { result: ConstructorType[] };
};

const StandingsPage = ({ driversData, constructorsData }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('drivers');

  const changeSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Head>
        <title>F1 Info - Standings</title>
        <meta name='description' content='F1 Info' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/bolid.png' />
      </Head>
      <main>
        <h2 className='text-white text-4xl'>Standings</h2>
        <div className='flex text-xl text-gray-600 font-semibold mt-4'>
          <button
            onClick={() => changeSelectedCategory('drivers')}
            className={`${
              selectedCategory === 'drivers' && 'text-yellow-200'
            } mr-5`}
          >
            Drivers
          </button>
          <button
            onClick={() => changeSelectedCategory('constructors')}
            className={`${
              selectedCategory === 'constructors' && 'text-yellow-200'
            }`}
          >
            Constructors
          </button>
        </div>
        <section className='flex flex-col gap-[1px] mt-4'>
          {selectedCategory === 'drivers'
            ? driversData.result.map((driver) => (
                <Result
                  key={driver.number}
                  result={driver}
                  position={driver.position}
                ></Result>
              ))
            : constructorsData.result.map((construtor) => (
                <Result
                  key={construtor.Constructor.constructorId}
                  result={construtor}
                  position={construtor.position}
                ></Result>
              ))}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const driversReq = await fetch(
    'https://ergast.com/api/f1/current/driverStandings.json'
  );

  let driversData;
  if (driversReq.ok) {
    const driversAPI: DriversStandingsAPI = await driversReq.json();
    driversData = {
      result:
        driversAPI.MRData.StandingsTable.StandingsLists[0].DriverStandings,
    };
  }

  const constructorsReq = await fetch(
    'http://ergast.com/api/f1/current/constructorStandings.json'
  );
  let constructorsData;
  if (constructorsReq.ok) {
    const constructorsAPI: ConstructorsStandingsAPI =
      await constructorsReq.json();
    constructorsData = {
      result:
        constructorsAPI.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings,
    };
  }

  return {
    props: {
      driversData,
      constructorsData,
    },
  };
};

export default StandingsPage;
