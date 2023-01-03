import Result from './Result';

type Props = {
  results: {
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
  }[];
};

const Results = ({ results }: Props) => {
  return (
    <section>
      {results.map((result) => (
        <Result
          result={result}
          key={result.number}
          position={result.position}
        />
      ))}
    </section>
  );
};

export default Results;
