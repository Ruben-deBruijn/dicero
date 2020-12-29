import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

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
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
      >
        <Topbar />

        <Switch>
          {ROUTES.map(routeProps => <Route {...routeProps} />)}
          <Redirect to={OVERVIEW_PATH} />
        </Switch>
      </SnackbarProvider>
    </div>
  )
};

export default App;
