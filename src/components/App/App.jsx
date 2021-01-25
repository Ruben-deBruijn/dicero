import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import SpeechRecognition from 'react-speech-recognition';

// Icons
import { DesktopAccessDisabled } from '@material-ui/icons';

// Core
import { Hidden, Typography } from '@material-ui/core';
import { Topbar } from '../navigation';
import { Bottombar } from '../../components';
import DialogWelcome from './DialogWelcome/DialogWelcome';

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
        <Hidden smUp>
            <Topbar />

            <Switch>
              {ROUTES.map(routeProps => <Route {...routeProps} />)}
              <Redirect to={OVERVIEW_PATH} />
            </Switch>

            {SpeechRecognition.browserSupportsSpeechRecognition && <Bottombar />}
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

        <DialogWelcome />
      </SnackbarProvider>
    </div>
  )
};

export default App;
