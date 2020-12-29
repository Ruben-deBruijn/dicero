import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Core
import { Topbar } from '../navigation';

// Routing
import { OVERVIEW_PATH } from '../../routes/paths';
import { ROUTES } from '../../routes/routes';

// Styles
import { useAppStyles } from './App.style';

const App = () => {
  const classes = useAppStyles() ;

  return (
    <div className={classes.wrapper}>
      <Topbar />

      <Switch>
        {ROUTES.map(routeProps => <Route {...routeProps} />)}
        <Redirect to={OVERVIEW_PATH} />
      </Switch>
    </div>
  )
};

export default App;
