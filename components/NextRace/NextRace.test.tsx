import { render, cleanup, screen } from '@testing-library/react';

import NextRace from './NextRace';

describe('NextRace component', () => {
  let nextRaceData: NextRaceType;

  beforeEach(() => {
    nextRaceData = {
      name: 'Mexico City Grand Prix',
      country: 'Mexico',
      track: 'Autódromo Hermanos Rodríguez',
      trackId: 'rodriguez',
      sessions: {
        fp1: {
          time: '18:00:00Z',
          date: '2022-10-28',
        },
        fp2: {
          time: '21:00:00Z',
          date: '2022-10-28',
        },
        fp3: {
          time: '17:00:00Z',
          date: '2022-10-29',
        },
        qualifying: {
          time: '20:00:00Z',
          date: '2022-10-29',
        },
        race: {
          time: '20:00:00Z',
          date: '2022-10-30',
        },
      },
    };
  });

  afterEach(() => {
    cleanup();
  });

  it('render race name, track name and country flag', () => {
    render(<NextRace nextRaceData={nextRaceData} />);

    const raceName = screen.getByText('Mexico City Grand Prix');
    const trackName = screen.getByText('Autódromo Hermanos Rodríguez');
    const flag = screen.getByAltText('Mexico');

    expect(raceName).toBeInTheDocument();
    expect(trackName).toBeInTheDocument();
    expect(flag).toBeInTheDocument();
  });
});
