import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

type Props = {
  constructorsData: ConstructorsData[];
};

const ConstructorsPage = ({ constructorsData }: Props) => {
  const [constructorsImg, setConstructorsImg] = useState<ConstructorType>();

  useEffect(() => {
    const fetchConstructor = async () => {
      const req = await fetch('/api/constructors');
      const res = await req.json();

      if (constructorsData) {
        setConstructorsImg(res);
      }
    };

    fetchConstructor().catch((err) => console.error(err));
  }, [constructorsData]);

  return (
    <>
      <Head>
        <title>F1 Info - Constructors</title>
        <meta name='description' content='F1 Info' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/bolid.png' />
      </Head>
      <main>
        <h2 className='text-white text-4xl'>Constructors</h2>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const constructorsReq = await fetch(
    'https://ergast.com/api/f1/current/constructors.json'
  );

  let constructorsData;
  if (constructorsReq.ok) {
    const constructorsAPI: ConstructorsAPI = await constructorsReq.json();
    constructorsData = {
      result: constructorsAPI.MRData.ConstructorTable.Constructors,
    };
  }

  return {
    props: {
      constructorsData,
    },
  };
};

export default ConstructorsPage;
