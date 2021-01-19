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
import { Hidden, Typography } from '@material-ui/core';
import { DesktopAccessDisabled } from '@material-ui/icons';
import { Bottombar } from '../../components';

const App = () => {
  const classes = useAppStyles() ;

  return (
    <div className={classes.wrapper}>
      <Hidden smUp>
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

          <Bottombar />
        </SnackbarProvider>
      </Hidden>

      <Hidden xsDown>
        <div className={classes.desktopPlaceholder}>
            <div className={classes.innerPlaceholder}>
              <DesktopAccessDisabled style={{ fontSize: 80, marginBottom: '16px' }} color="primary" />
              <Typography color="textPrimary" align="center">
                Dicero is currently only available on Mobile devices
              </Typography>
            </div>
        </div>
      </Hidden>
    </div>
  )
};

export default App;
