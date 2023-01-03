import Result from '../PreviousRace/Results/Result';
import Position from './Position';

type Props = {
  podium: {
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

const Podium = ({ podium }: Props) => {
  return (
    <>
      <div className='lg:hidden'>
        {podium.map((position) => (
          <Result
            key={position.number}
            result={position}
            position={position.position}
          />
        ))}
      </div>
      <div className='hidden lg:flex justify-around mb-8'>
        <Position podium={podium[1]} />
        <Position podium={podium[0]} />
        <Position podium={podium[2]} />
      </div>
    </>
  );
};

export default Podium;
