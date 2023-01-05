import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getDriverNationality } from '../utils/getDriverNationality';

type Props = {
  driversData: DriverData[];
};

type Fetch = {
  [key: string]: {
    name: string;
    image: string;
  };
};

const DriversPage = ({ driversData }: Props) => {
  const [driversImg, setDriversImg] = useState<Fetch>();

  useEffect(() => {
    const fetchDriver = async () => {
      const req = await fetch('/api/drivers');
      const res = await req.json();

      setDriversImg(res);
    };

    fetchDriver().catch((err) => console.error(err));
  }, [driversData]);

  return (
    <>
      <Head>
        <title>F1 Info - Drivers</title>
        <meta name='description' content='F1 Info' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/bolid.png' />
      </Head>
      <main>
        <h2 className='text-white text-4xl'>Drivers</h2>
        <section className='flex flex-wrap justify-center gap-2 mt-6 mb-12'>
          {driversData.map((driver) => (
            <div key={driver.driverId} className='flex flex-col rounded-md'>
              <div className='relative overflow-hidden w-full h-40 rounded-t-md'>
                <Image
                  src={`https://countryflagsapi.com/png/${getDriverNationality(
                    driver.nationality
                  )}`}
                  alt={driver.driverId}
                  fill
                  className='h-full w-auto blur-sm opacity-30'
                />
                {driversImg && (
                  <Image
                    src={
                      driversImg[driver.driverId]
                        ? driversImg[driver.driverId].image
                        : driversImg['unknown'].image
                    }
                    alt={driver.driverId}
                    fill
                    className='object-contain'
                  />
                )}
              </div>
              <div className='w-64 p-4 flex flex-col items-center text-white bg-gray-700 rounded-b-md'>
                <p className='font-medium text-lg'>
                  {driver.givenName} {driver.familyName}
                </p>
                <p className='text-gray-900'>{driver.dateOfBirth}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const driversReq = await fetch(
    'https://ergast.com/api/f1/current/drivers.json'
  );

  let driversData;
  if (driversReq.ok) {
    const driversAPI: DriversAPI = await driversReq.json();
    driversData = driversAPI.MRData.DriverTable.Drivers;
  }

  return {
    props: {
      driversData,
    },
  };
};

export default DriversPage;
