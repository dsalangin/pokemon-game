import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';

import cn from 'classnames';

import HomePage from './routes/Home/index';
import GamePage from './routes/Game/index';
import AboutPage from './routes/About/index';
import  ContactPage from './routes/Contact/index';
import  NotFound from './routes/NotFound/index';
import PrivateRoute from './components/PrivateRoute/index';

import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';

import s from './style.module.css';

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';

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