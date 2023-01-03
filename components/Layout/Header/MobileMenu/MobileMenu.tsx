import Link from 'next/link';

type Props = {
  handleMobileMenuOpen: () => void;
};

const MobileMenu = ({ handleMobileMenuOpen }: Props) => {
  return (
    <>
      <div className='w-screen h-screen fixed inset-0 bg-gray-900 opacity-80 z-40'></div>
      <nav className='bg-gray-900 h-screen w-56 fixed top-0 right-0 animate-show p-4 pt-8 flex flex-col text-red-600 border-l border-l-gray-800 z-50'>
        <span
          onClick={handleMobileMenuOpen}
          className='bg-white w-5 h-0.5 rounded-full rotate-45 relative mb-8 before:content-[""] before:absolute before:rotate-90 before:bg-white before:w-5 before:h-0.5 before:rounded-full'
        ></span>
        <ul className='text-red-600 space-x-10 text-lg font-medium'>
          <Link href='/' onClick={handleMobileMenuOpen}>
            <li>Home</li>
          </Link>
          <Link href='/results' onClick={handleMobileMenuOpen}>
            <li>Results</li>
          </Link>
          <Link href='/standings' onClick={handleMobileMenuOpen}>
            <li>Standing</li>
          </Link>
          <Link href='/schedule' onClick={handleMobileMenuOpen}>
            <li>Schedule</li>
          </Link>
          <Link href='/drivers' onClick={handleMobileMenuOpen}>
            <li>Drivers</li>
          </Link>
          <Link href='/constructors' onClick={handleMobileMenuOpen}>
            <li>Constructors</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;
