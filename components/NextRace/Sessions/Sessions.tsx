import Session from './Session';

type Props = {
  sessions: {
    fp1: {
      time: string;
      date: string;
    };
    fp2: {
      time: string;
      date: string;
    };
    fp3: {
      time: string;
      date: string;
    };
    qualifying: {
      time: string;
      date: string;
    };
    race: {
      time: string;
      date: string;
    };
    sprint: {
      time: string;
      date: string;
    };
  };
};

const Sessions = ({ sessions }: Props) => {
  return (
    <section className='flex flex-col'>
      <Session
        name='Race'
        date={sessions.race.date}
        time={sessions.race.time}
      />
      {sessions.sprint.time && (
        <>
          <Session
            name='Sprint'
            date={sessions.sprint.date}
            time={sessions.sprint.time}
          />
          <Session
            name='Practice 2'
            date={sessions.fp2.date}
            time={sessions.fp2.time}
          />
          <Session
            name='Qualifying'
            date={sessions.qualifying.date}
            time={sessions.qualifying.time}
          />
        </>
      )}
      {!sessions.sprint.time && (
        <>
          <Session
            name='Qualifying'
            date={sessions.qualifying.date}
            time={sessions.qualifying.time}
          />
          <Session
            name='Practice 3'
            date={sessions.fp3.date}
            time={sessions.fp3.time}
          />
          <Session
            name='Practice 2'
            date={sessions.fp2.date}
            time={sessions.fp2.time}
          />
        </>
      )}
      <Session
        name='Practice 1'
        date={sessions.fp1.date}
        time={sessions.fp1.time}
      />
    </section>
  );
};

export default Sessions;
