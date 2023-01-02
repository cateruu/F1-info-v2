import Image from 'next/image';
import Link from 'next/link';
import LogoPNG from '../../../public/logo.png';

const Header = () => {
  return (
    <header className='flex py-3 justify-between items-center mb-16'>
      <Link href='/'>
        <Image src={LogoPNG} alt='logo' className='w-24' />
      </Link>
      <ul className='text-red-600 flex space-x-10 text-lg font-medium'>
        <Link href='/results'>
          <li>Results</li>
        </Link>
        <Link href='/standings'>
          <li>Standing</li>
        </Link>
        <Link href='/schedule'>
          <li>Schedule</li>
        </Link>
        <Link href='/drivers'>
          <li>Drivers</li>
        </Link>
        <Link href='/constructors'>
          <li>Constructors</li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
