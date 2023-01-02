import { act, cleanup, render, screen } from '@testing-library/react';
import Timer from './Timer';
import { getTimeToRace } from '../../../utils/getTimeToRace';

jest.useFakeTimers();

jest.mock('../../../utils/getTimeToRace', () => ({ getTimeToRace: jest.fn() }));

describe('Timer component', () => {
  let props: { date: string; time: string };

  beforeAll(() => {
    props = {
      date: '2023-02-28',
      time: '18:00:00Z',
    };
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correct time left till next race', () => {
    (getTimeToRace as jest.Mock).mockReturnValue('24:00:00');
    render(<Timer {...props} />);
    act(() => jest.runAllTimers());

    expect(screen.getByText('24:00:00')).toBeInTheDocument();
  });

  it('renders Live if race is currently live', () => {
    (getTimeToRace as jest.Mock).mockReturnValue('Live');
    render(<Timer {...props} />);
    act(() => jest.runAllTimers());

    expect(screen.getByText('Live')).toBeInTheDocument();
  });
});
