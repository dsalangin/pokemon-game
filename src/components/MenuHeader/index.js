import { useState } from 'react';

import Menu from '../Menu/index';
import Navbar from '../Navbar/index';

const MenuHeader = () => {
  const [active, setActive] = useState(null);

  const handleChangeMenu = () => {
    setActive(prewState => !prewState);
  };

  return (
    <>
      <Menu 
        isActive={active}
      />
      <Navbar 
        isActive={active}
        onChangeMenu={handleChangeMenu}
      />
    </>
  );
};

export default MenuHeader;