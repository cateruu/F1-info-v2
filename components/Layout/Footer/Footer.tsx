const Footer = () => {
  return (
    <footer className='text-center text-gray-500 text-sm mb-4'>
      Made by{' '}
      <a
        href='https://github.com/cateruu'
        target='_blank'
        rel='noreferrer'
        className='text-red-600'
      >
        Paweł
      </a>
      , Powered by{' '}
      <a
        href='https://ergast.com/'
        target='_blank'
        rel='noreferrer'
        className='text-red-600'
      >
        Ergast API
      </a>
    </footer>
  );
};

export default Footer;
