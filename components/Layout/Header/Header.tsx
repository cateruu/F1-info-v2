import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LogoPNG from '../../../public/logo.png';
import Hamburger from './Hamburger/Hamburger';
import MobileMenu from './MobileMenu/MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className='flex py-3 justify-between items-center mb-16'>
      <Link href='/'>
        <Image src={LogoPNG} alt='logo' className='w-24' />
      </Link>
      <ul className='text-red-600 hidden space-x-10 text-base font-semibold lg:flex'>
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
      <Hamburger handleMobileMenuOpen={handleMobileMenuOpen} />
      {isMobileMenuOpen && (
        <MobileMenu handleMobileMenuOpen={handleMobileMenuOpen} />
      )}
    </header>
  );
};

export default Header;
