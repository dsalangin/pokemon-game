import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import {NotificationManager} from 'react-notifications';

import { getUserUpdateAsync } from '../../store/user';

import Menu from '../Menu/index';
import Navbar from '../Navbar/index';
import Modal from '../Modal/index';
import LoginForm from '../LoginForm/index';

import 'react-notifications/lib/notifications.css';

const loginSignupUser = async ({email, password, type}) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    })
  };

  switch (type) {
    case 'signup':
      return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIXaa2NpsPsnzsDgwFHU6zfbP1klBlgAc', requestOptions).then(res => res.json());
    case 'login':
      return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIXaa2NpsPsnzsDgwFHU6zfbP1klBlgAc', requestOptions).then(res => res.json());
    default:
      return 'I can`t login user';
  };
};

const MenuHeader = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(null);

  const dispatch = useDispatch();

  const handleClickHamburger = () => {
    setOpen(prewState => !prewState);
  };

  const handleClickLogin = () => {
    setOpenModal(prewState => !prewState);
  }

  const handleSubmitLoginForm = async (props) => {
    const responce = await loginSignupUser(props);

    if(responce.hasOwnProperty('error')) {
      NotificationManager.error('Error', 'Title');
    } else {
      if(props.type === 'signup') {
        const pokemonsStart = await fetch ('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
        console.log(pokemonsStart);

        for(const item of pokemonsStart.data) {
          await fetch (`https://pokemon-game-dsa-default-rtdb.firebaseio.com/${responce.localId}/pokemons.json?auth=${responce.idToken}`, {
            method: 'POST',
            body: JSON.stringify(item)
          })
        }
      }
      localStorage.setItem('idToken', responce.idToken);
      NotificationManager.success('Success mesage');
      dispatch(getUserUpdateAsync());
      handleClickLogin();
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
          isResetField={!isOpenModal}
          onSubmit={handleSubmitLoginForm}
        />
      </Modal>
    </>
  );
};

export default MenuHeader;