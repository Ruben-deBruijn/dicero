import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useQuery } from '@apollo/client';

// Icons
import { DesktopAccessDisabled } from '@material-ui/icons';

// Core
import { Box, Dialog, DialogContent, Hidden, Typography, Zoom } from '@material-ui/core';
import { Topbar } from '../navigation';
import { Bottombar } from '../../components';
import { UserContext } from '../../providers/User.provider';
import { SelectField } from '../fields';

// GraphQL
import { GET_USERS } from '../../graphql';

// Routing
import { OVERVIEW_PATH } from '../../routes/paths';
import { ROUTES } from '../../routes/routes';

// Styles
import { useAppStyles } from './App.style';

const GetUsers = () => {
  const { loading, data } = useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { usersLoading: true, users: [] };
  return (data && { usersLoading: false, users: data.getUsers }) || [];
};

const App = () => {
  const classes = useAppStyles() ;
  const { users, loading } = GetUsers();
  const { userState, setUser } = useContext(UserContext);

  const onUserSelect = values => {
    const selectedUser = users.filter(user => user.id === values);
    setUser(selectedUser[0]);
  };

  if (loading) return 'Loading...';

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

      <Dialog 
        open={!userState}
        TransitionComponent={Zoom}
      >
        <DialogContent>
          <Typography color="error" align="center">
            U bent nog niet inglogd
          </Typography>
          <Box py={3}>
            <SelectField
                fullWidth
                label="Gebruiker" 
                items={users}
                value={(userState && userState.id) || ''}
                onChange={event => onUserSelect(event.target.value)}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default App;
