import Header from './Header/Header';

import { Poppins } from '@next/font/google';

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
      className={`${poppins.className} flex flex-col mx-auto w-11/12 lg:w-3/4`}
    >
      <Header />
      {children}
    </div>
  );
};

export default Layout;
