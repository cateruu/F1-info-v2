type Props = {
  handleMobileMenuOpen: () => void;
};

const Hamburger = ({ handleMobileMenuOpen }: Props) => {
  return (
    <div
      className='w-5 h-0.5 bg-white rounded-lg relative lg:hidden after:content-[""] after:bg-white after:w-5 after:h-0.5 after:absolute after:-top-1.5 before:content-[""] before:bg-white before:w-5 before:h-0.5 before:absolute before:top-1.5'
      onClick={handleMobileMenuOpen}
    ></div>
  );
};

export default Hamburger;
