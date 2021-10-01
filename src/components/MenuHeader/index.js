import { useState } from 'react';
import {NotificationManager} from 'react-notifications';

import Menu from '../Menu/index';
import Navbar from '../Navbar/index';
import Modal from '../Modal/index';
import LoginForm from '../LoginForm/index';

import 'react-notifications/lib/notifications.css';

const MenuHeader = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(true);

  const handleClickHamburger = () => {
    setOpen(prewState => !prewState);
  };

  const handleClickLogin = () => {
    setOpenModal(prewState => !prewState);
  }

  const handleSubmitLoginForm = async ({email, password}) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    };
    const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIXaa2NpsPsnzsDgwFHU6zfbP1klBlgAc', requestOptions).then(res => res.json());
    if(responce.hasOwnProperty('error')) {
      NotificationManager.error('Error', 'Title');
    } else {
      localStorage.setItem('idToken', responce.idToken);
      NotificationManager.success('Success mesage');
    };
  };


  const handleSubmitAuthForm = async ({email, password}) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    };
    const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIXaa2NpsPsnzsDgwFHU6zfbP1klBlgAc', requestOptions).then(res => res.json());
    if(responce.hasOwnProperty('error')) {
      NotificationManager.error('Error', 'Title');
    } else {
      localStorage.setItem('idToken', responce.idToken);
      NotificationManager.success('Success mesage');
    };
  };
  
  const handleSubmit = (sign, userData) => {
    if(sign==='SIGNUP') {
      handleSubmitLoginForm(userData);
    } else if (sign==='SIGNIN') { 
      handleSubmitAuthForm(userData);
    };
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
        onClickLogin={handleClickLogin}
      />
      <Modal 
        isOpen={isOpenModal}
        title="Log in..."
        onCloseModal={handleClickLogin}
      >
        <LoginForm 
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default MenuHeader;