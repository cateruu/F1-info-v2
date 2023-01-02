import Header from './Header/Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col w-3/4 mx-auto'>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
