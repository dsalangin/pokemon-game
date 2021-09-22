import { useState } from 'react';

import Menu from '../Menu/index';
import Navbar from '../Navbar/index';

const MenuHeader = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);

  const handleClickHamburger = () => {
    setOpen(prewState => !prewState);
  };
  

  return (
    <>
      <Menu 
        isOpen={isOpen}
        closeMenu={handleClickHamburger}
      />
      <Navbar 
        isOpen={isOpen}
        clickHamburger={handleClickHamburger}
        bgActive={bgActive}
      />
    </>
  );
};

export default MenuHeader;