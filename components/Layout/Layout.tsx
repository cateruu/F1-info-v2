import Header from './Header/Header';

import { Poppins } from '@next/font/google';
import Footer from './Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      className={`${poppins.className} flex flex-col mx-auto w-11/12 lg:w-8/12`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
