import Result from './Result';

type Props = {
  results: DriverType[] | ConstructorType[];
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
