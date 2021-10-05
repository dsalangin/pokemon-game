import { useEffect } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {NotificationContainer} from 'react-notifications';

import cn from 'classnames';

import HomePage from './routes/Home/index';
import GamePage from './routes/Game/index';
import AboutPage from './routes/About/index';
import  ContactPage from './routes/Contact/index';
 import UserPage from'./routes/User/index';
import  NotFound from './routes/NotFound/index';
import PrivateRoute from './components/PrivateRoute/index';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';

import { getUserAsync, selectUserLoading } from './store/user';

import s from './style.module.css';


const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync())
  }, []);

  if (isUserLoading) {
    return 'Loading...';
  };
  
  return (
    <>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(s.wrap, {
              [s.isHomePage]: isPadding
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/contact" component={ContactPage} />
                <PrivateRoute path="/user" component={UserPage} />
                <Route render={() => (
                  <Redirect to="/404"/>
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>
  )
};

export default App;