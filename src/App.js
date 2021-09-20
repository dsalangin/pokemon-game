import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';

import cn from 'classnames';

import HomePage from './routes/Home/index';
import GamePage from './routes/Game/index';
import AboutPage from './routes/About/index';
import  ContactPage from './routes/Contact/index';
import  NotFound from './routes/NotFound/index';

import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';

import s from './style.module.css';

const App = () => {
  const match=useRouteMatch('/');
  return (
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!match.isExact} />
            <div className={cn(s.wrap, {
              [s.isHomePage]: match.isExact
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (
                  <Redirect to="/404"/>
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
  )
};

export default App;